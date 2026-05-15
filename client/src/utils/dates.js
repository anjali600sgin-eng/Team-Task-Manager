export function getDueDateInfo(dueDate, status) {
  if (!dueDate) return null;

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));

  if (status === 'Done') {
    return { label: `Due ${due.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`, color: 'slate', urgent: false };
  }

  if (diffDays < 0) {
    return { label: `Overdue by ${Math.abs(diffDays)}d`, color: 'rose', urgent: true };
  }
  if (diffDays === 0) {
    return { label: 'Due today', color: 'amber', urgent: true };
  }
  if (diffDays <= 3) {
    return { label: `Due in ${diffDays}d`, color: 'amber', urgent: false };
  }
  return {
    label: `Due ${due.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
    color: 'slate',
    urgent: false,
  };
}

export const dueDateColors = {
  rose: 'text-red-700 bg-red-50 dark:text-red-400 dark:bg-red-900/15',
  amber: 'text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/15',
  slate: 'text-surface-500 bg-surface-100 dark:text-surface-400 dark:bg-surface-800',
};
