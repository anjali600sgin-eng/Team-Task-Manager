import Drawer from '../ui/Drawer';
import Badge from '../ui/Badge';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import { getDueDateInfo, dueDateColors } from '../../utils/dates';
import { Calendar, User, Flag, Clock } from 'lucide-react';
import clsx from 'clsx';

export default function TaskDetailDrawer({ task, open, onClose, isAdmin, onEdit, onDelete, onStatusChange }) {
  if (!task) return null;

  const dateInfo = getDueDateInfo(task.dueDate, task.status);

  return (
    <Drawer open={open} onClose={onClose} title="Task Details">
      <div className="space-y-5">
        <div>
          <h3 className="text-lg font-bold text-surface-900 dark:text-white">{task.title}</h3>
          {task.description && (
            <p className="text-surface-500 dark:text-surface-400 mt-2 text-sm leading-relaxed">{task.description}</p>
          )}
        </div>

        <div className="space-y-3 bg-surface-50 dark:bg-surface-800 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-surface-500">
              <Clock className="w-4 h-4" /> Status
            </div>
            <select
              value={task.status}
              onChange={(e) => onStatusChange?.(task._id, e.target.value)}
              className="text-xs px-2.5 py-1.5 border border-surface-200 dark:border-surface-700 rounded-lg bg-white dark:bg-surface-900 text-surface-700 dark:text-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-surface-500">
              <Flag className="w-4 h-4" /> Priority
            </div>
            <Badge variant="priority" value={task.priority} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-surface-500">
              <User className="w-4 h-4" /> Assigned
            </div>
            {task.assignedTo ? (
              <div className="flex items-center gap-2">
                <Avatar name={task.assignedTo.name} size="sm" />
                <span className="text-sm font-semibold text-surface-700 dark:text-surface-200">{task.assignedTo.name}</span>
              </div>
            ) : (
              <span className="text-sm text-surface-400">Unassigned</span>
            )}
          </div>

          {task.dueDate && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-surface-500">
                <Calendar className="w-4 h-4" /> Due date
              </div>
              <span className={clsx('text-xs font-semibold px-2 py-0.5 rounded-md', dateInfo && dueDateColors[dateInfo.color])}>
                {dateInfo?.label || new Date(task.dueDate).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        <p className="text-[11px] text-surface-400">
          Created {new Date(task.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        {isAdmin && (
          <div className="flex gap-2 pt-2">
            <Button variant="secondary" size="sm" className="flex-1" onClick={() => { onClose(); onEdit?.(task); }}>
              Edit Task
            </Button>
            <Button variant="danger" size="sm" className="flex-1" onClick={() => { onDelete?.(task._id); onClose(); }}>
              Delete
            </Button>
          </div>
        )}
      </div>
    </Drawer>
  );
}
