import Badge from '../ui/Badge';
import Avatar from '../ui/Avatar';
import { getDueDateInfo, dueDateColors } from '../../utils/dates';
import { Calendar, GripVertical } from 'lucide-react';
import clsx from 'clsx';

export default function TaskCard({
  task,
  compact = false,
  isAdmin = false,
  onStatusChange,
  onEdit,
  onDelete,
  onClick,
  dragHandleProps,
}) {
  const dateInfo = getDueDateInfo(task.dueDate, task.status);

  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-white dark:bg-surface-900 rounded-xl border border-surface-200/80 dark:border-surface-800 transition-all duration-150 cursor-pointer hover:shadow-soft hover:border-surface-300 dark:hover:border-surface-700',
        compact ? 'p-3' : 'p-3 sm:p-4',
        dateInfo?.urgent && task.status !== 'Done' && 'border-l-2 border-l-red-400'
      )}
    >
      <div className="flex items-start gap-2 sm:gap-3">
        {dragHandleProps && (
          <div {...dragHandleProps} className="mt-0.5 text-surface-300 dark:text-surface-600 hover:text-surface-500 cursor-grab">
            <GripVertical className="w-4 h-4" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className={clsx('font-semibold text-surface-900 dark:text-white', compact ? 'text-xs' : 'text-sm')}>
              {task.title}
            </h4>
            {task.assignedTo && (
              <Avatar name={task.assignedTo.name} size="sm" className="shrink-0" />
            )}
          </div>

          {!compact && task.description && (
            <p className="text-xs text-surface-500 dark:text-surface-400 mt-1 line-clamp-2">{task.description}</p>
          )}

          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            {!compact && <Badge variant="status" value={task.status} />}
            <Badge variant="priority" value={task.priority} />
            {dateInfo && (
              <span className={clsx('text-[11px] px-1.5 py-0.5 rounded-md font-semibold inline-flex items-center gap-1', dueDateColors[dateInfo.color])}>
                <Calendar className="w-3 h-3" />
                <span className="hidden xs:inline">{dateInfo.label}</span>
                <span className="xs:hidden">{dateInfo.label.replace('Overdue by ', '-').replace('Due in ', '').replace('Due today', 'Today')}</span>
              </span>
            )}
          </div>

          {!compact && (
            <div className="flex items-center gap-2 mt-2.5 pt-2.5 border-t border-surface-100 dark:border-surface-800">
              <select
                value={task.status}
                onChange={(e) => { e.stopPropagation(); onStatusChange?.(task._id, e.target.value); }}
                onClick={(e) => e.stopPropagation()}
                className="text-[11px] px-2 py-1.5 border border-surface-200 dark:border-surface-700 rounded-lg bg-surface-50 dark:bg-surface-800 text-surface-600 dark:text-surface-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>
              <div className="flex-1" />
              {isAdmin && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); onEdit?.(task); }}
                    className="text-[11px] text-primary-600 dark:text-primary-400 hover:text-primary-800 font-semibold px-2 py-1 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); onDelete?.(task._id); }}
                    className="text-[11px] text-red-500 dark:text-red-400 hover:text-red-700 font-semibold px-2 py-1 transition-colors"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
