import clsx from 'clsx';

const statusStyles = {
  'To Do': 'bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300 before:bg-amber-400',
  'In Progress': 'bg-primary-50 text-primary-800 dark:bg-primary-900/20 dark:text-primary-300 before:bg-primary-400',
  'Done': 'bg-emerald-50 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300 before:bg-emerald-400',
};

const priorityStyles = {
  Low: 'bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-400 before:bg-surface-400',
  Medium: 'bg-orange-50 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300 before:bg-orange-400',
  High: 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300 before:bg-red-400',
};

const roleStyles = {
  Admin: 'bg-primary-50 text-primary-800 dark:bg-primary-900/20 dark:text-primary-300 before:bg-primary-400',
  Member: 'bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-400 before:bg-surface-400',
};

const styleMaps = { status: statusStyles, priority: priorityStyles, role: roleStyles };

export default function Badge({ variant = 'status', value, className }) {
  const styleMap = styleMaps[variant] || statusStyles;
  const styles = styleMap[value] || 'bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-400 before:bg-surface-400';

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wide',
        'before:w-1.5 before:h-1.5 before:rounded-full before:shrink-0',
        styles,
        className
      )}
    >
      {value}
    </span>
  );
}
