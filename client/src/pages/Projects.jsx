import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from "../utils/api";
import toast from 'react-hot-toast';
import { FolderPlus, Trash2, FolderOpen } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Avatar from '../components/ui/Avatar';
import EmptyState from '../components/ui/EmptyState';
import Skeleton from '../components/ui/Skeleton';

export default function Projects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [creating, setCreating] = useState(false);

  const isGlobalAdmin = user?.role === 'Admin';

  const fetchProjects = () => {
    API.get('/projects')
      .then((res) => setProjects(res.data))
      .catch(() => toast.error('Failed to load projects'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await API.post('/projects', { name, description });
      toast.success('Project created');
      setName('');
      setDescription('');
      setShowModal(false);
      fetchProjects();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create project');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await API.delete(`/projects/${id}`);
      toast.success('Project deleted');
      fetchProjects();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete project');
    }
  };

  const getRole = (project) => {
    const member = project.members.find(
      (m) => m.user._id === user.id || m.user._id === user._id
    );
    return member?.role || 'Member';
  };

  if (loading) {
    return (
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <Skeleton variant="text" className="w-32 h-8" />
          <Skeleton variant="text" className="w-32 h-10 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[...Array(6)].map((_, i) => <Skeleton key={i} variant="card" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-slide-up">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold text-surface-900 dark:text-white">Projects</h1>
          <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">{projects.length} project{projects.length !== 1 ? 's' : ''}</p>
        </div>
        {isGlobalAdmin && (
          <Button onClick={() => setShowModal(true)} size="sm">
            <FolderPlus className="w-4 h-4" />
            New Project
          </Button>
        )}
      </div>

      {isGlobalAdmin && (
        <Modal open={showModal} onClose={() => setShowModal(false)} title="Create Project">
          <form onSubmit={handleCreate} className="space-y-4">
            <Input
              label="Project Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Website Redesign"
            />
            <Input
              label="Description"
              textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this project about?"
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="secondary" size="sm" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button type="submit" size="sm" loading={creating}>Create Project</Button>
            </div>
          </form>
        </Modal>
      )}

      {projects.length === 0 ? (
        <EmptyState
          icon={isGlobalAdmin ? FolderPlus : FolderOpen}
          title={isGlobalAdmin ? 'No projects yet' : 'No projects assigned'}
          description={
            isGlobalAdmin
              ? 'Create your first project to start managing tasks with your team.'
              : 'You have not been added to any projects yet. Ask an admin to add you.'
          }
          actionLabel={isGlobalAdmin ? 'Create Project' : undefined}
          onAction={isGlobalAdmin ? () => setShowModal(true) : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {projects.map((project) => (
            <Link key={project._id} to={`/projects/${project._id}`}>
              <Card hover className="p-4 h-full">
                <div className="flex justify-between items-start mb-1.5">
                  <h3 className="font-semibold text-sm text-surface-900 dark:text-white truncate flex-1">
                    {project.name}
                  </h3>
                  <Badge variant="role" value={getRole(project)} className="ml-2 shrink-0" />
                </div>

                {project.description && (
                  <p className="text-xs text-surface-500 dark:text-surface-400 mb-3 line-clamp-2">{project.description}</p>
                )}

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-surface-100 dark:border-surface-800">
                  <div className="flex -space-x-1.5">
                    {project.members.slice(0, 3).map((m) => (
                      <Avatar key={m.user._id} name={m.user.name} size="sm" className="ring-2 ring-white dark:ring-surface-900" />
                    ))}
                    {project.members.length > 3 && (
                      <div className="w-7 h-7 rounded-lg bg-surface-100 dark:bg-surface-800 flex items-center justify-center text-[10px] font-bold text-surface-500 ring-2 ring-white dark:ring-surface-900">
                        +{project.members.length - 3}
                      </div>
                    )}
                  </div>

                  {getRole(project) === 'Admin' && (
                    <button
                      onClick={(e) => handleDelete(project._id, e)}
                      className="p-1.5 rounded-lg text-surface-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
