import { List, LayoutGrid } from 'lucide-react';
import clsx from 'clsx';

export default function ViewToggle({ view, onViewChange }) {
  return (
    <div className="flex bg-surface-100 dark:bg-surface-800 p-0.5 rounded-lg">
      <button
        onClick={() => onViewChange('list')}
        className={clsx(
          'flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[11px] font-semibold transition-all duration-150',
          view === 'list' ? 'bg-white dark:bg-surface-700 text-surface-900 dark:text-white shadow-sm' : 'text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
        )}
      >
        <List className="w-3.5 h-3.5" />
        List
      </button>
      <button
        onClick={() => onViewChange('board')}
        className={clsx(
          'flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[11px] font-semibold transition-all duration-150',
          view === 'board' ? 'bg-white dark:bg-surface-700 text-surface-900 dark:text-white shadow-sm' : 'text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
        )}
      >
        <LayoutGrid className="w-3.5 h-3.5" />
        Board
      </button>
    </div>
  );
}
