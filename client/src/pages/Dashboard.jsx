import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from "../utils/api";
import { FolderOpen, CheckCircle2, User, AlertTriangle, ArrowRight, ClipboardList, Shield } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import ProgressRing from '../components/ui/ProgressRing';
import Skeleton from '../components/ui/Skeleton';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

const statusBarColors = {
  'To Do': 'bg-amber-400',
  'In Progress': 'bg-primary-500',
  'Done': 'bg-emerald-500',
};

const statStyles = [
  { iconBg: 'bg-primary-50 dark:bg-primary-900/20', iconColor: 'text-primary-600 dark:text-primary-400', topBorder: 'border-t-2 border-t-primary-500' },
  { iconBg: 'bg-emerald-50 dark:bg-emerald-900/20', iconColor: 'text-emerald-600 dark:text-emerald-400', topBorder: 'border-t-2 border-t-emerald-500' },
  { iconBg: 'bg-warm-50 dark:bg-warm-900/20', iconColor: 'text-warm-600 dark:text-warm-400', topBorder: 'border-t-2 border-t-warm-500' },
  { iconBg: 'bg-red-50 dark:bg-red-900/20', iconColor: 'text-red-600 dark:text-red-400', topBorder: 'border-t-2 border-t-red-500' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const isGlobalAdmin = user?.role === 'Admin';

  useEffect(() => {
    Promise.all([
      API.get('/dashboard'),
      API.get('/projects'),
    ])
      .then(([statsRes, projRes]) => {
        setStats(statsRes.data);
        setProjects(projRes.data.slice(0, 4));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="animate-fade-in">
        <Skeleton variant="text" className="w-64 h-8 mb-2" />
        <Skeleton variant="text" className="w-96 h-4 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => <Skeleton key={i} variant="stat-card" />)}
        </div>
      </div>
    );
  }

  if (!stats) return <div className="text-center mt-10 text-surface-500">Failed to load dashboard</div>;

  const completionRate = stats.totalTasks > 0
    ? ((stats.tasksByStatus['Done'] || 0) / stats.totalTasks) * 100
    : 0;

  const adminStatConfig = [
    { key: 'totalProjects', label: 'Projects', icon: FolderOpen },
    { key: 'totalTasks', label: 'Total Tasks', icon: CheckCircle2 },
    { key: 'myTasks', label: 'My Tasks', icon: User },
    { key: 'overdueTasks', label: 'Overdue', icon: AlertTriangle },
  ];

  const memberStatConfig = [
    { key: 'totalProjects', label: 'My Projects', icon: FolderOpen },
    { key: 'myTasks', label: 'My Tasks', icon: ClipboardList },
    { key: 'overdueTasks', label: 'Overdue', icon: AlertTriangle },
  ];

  const statConfig = isGlobalAdmin ? adminStatConfig : memberStatConfig;

  return (
    <div className="animate-slide-up">
      {/* Welcome */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-surface-900 dark:text-white">
          {getGreeting()}, {user?.name?.split(' ')[0]}
        </h1>
        <p className="text-sm text-surface-500 dark:text-surface-400 mt-0.5">
          {isGlobalAdmin
            ? "Here's what's happening across your projects."
            : "Here's an overview of your assigned tasks."
          }
        </p>
      </div>

      {/* Stat Cards */}
      <div className={`grid gap-3 mb-6 ${isGlobalAdmin ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-3'}`}>
        {statConfig.map(({ key, label, icon: Icon }, index) => {
          const style = statStyles[index % statStyles.length];
          return (
            <Card key={key} className={`p-4 ${style.topBorder}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-surface-400">{label}</p>
                  <p className="text-2xl font-bold text-surface-900 dark:text-white mt-1">{stats[key]}</p>
                </div>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${style.iconBg}`}>
                  <Icon className={`w-4 h-4 ${style.iconColor}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="lg:col-span-2 p-5">
          <h2 className="text-sm font-bold text-surface-900 dark:text-white mb-4">
            {isGlobalAdmin ? 'Tasks by Status' : 'My Tasks by Status'}
          </h2>

          {stats.totalTasks > 0 && (
            <div className="flex rounded-full h-2 overflow-hidden mb-5 bg-surface-100 dark:bg-surface-800">
              {Object.entries(stats.tasksByStatus).map(([status, count]) => (
                count > 0 && (
                  <div
                    key={status}
                    className={`${statusBarColors[status]} transition-all duration-500`}
                    style={{ width: `${(count / stats.totalTasks) * 100}%` }}
                    title={`${status}: ${count}`}
                  />
                )
              ))}
            </div>
          )}

          <div className="space-y-3">
            {Object.entries(stats.tasksByStatus).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-sm ${statusBarColors[status]}`} />
                  <span className="text-sm text-surface-600 dark:text-surface-400">{status}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 sm:w-32 bg-surface-100 dark:bg-surface-800 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${statusBarColors[status]}`}
                      style={{ width: `${stats.totalTasks ? (count / stats.totalTasks) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-surface-700 dark:text-surface-300 w-6 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 flex flex-col items-center justify-center">
          <h2 className="text-sm font-bold text-surface-900 dark:text-white mb-4">Completion</h2>
          <ProgressRing percentage={completionRate} size={110} strokeWidth={8} />
          <p className="text-xs text-surface-500 dark:text-surface-400 mt-3">
            {stats.tasksByStatus['Done'] || 0} of {stats.totalTasks} tasks done
          </p>
        </Card>
      </div>

      {/* Member info */}
      {!isGlobalAdmin && (
        <Card className="p-4 mb-6 border-l-2 border-l-primary-500">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-surface-900 dark:text-white">Member Access</p>
              <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">
                You can view and update status of tasks assigned to you. Contact an admin to create projects or manage team members.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-surface-900 dark:text-white">
              {isGlobalAdmin ? 'Recent Projects' : 'My Projects'}
            </h2>
            <Link to="/projects" className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 font-semibold flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {projects.map((project) => (
              <Link key={project._id} to={`/projects/${project._id}`}>
                <Card hover className="p-4">
                  <h3 className="font-semibold text-sm text-surface-900 dark:text-white truncate">{project.name}</h3>
                  {project.description && (
                    <p className="text-xs text-surface-500 dark:text-surface-400 mt-1 line-clamp-2">{project.description}</p>
                  )}
                  <p className="text-[11px] text-surface-400 mt-2">
                    {project.members.length} member{project.members.length !== 1 ? 's' : ''}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
