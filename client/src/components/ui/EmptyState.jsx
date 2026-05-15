import Button from './Button';

export default function EmptyState({ icon: Icon, title, description, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {Icon && (
        <div className="w-14 h-14 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mb-4">
          <Icon className="w-7 h-7 text-primary-500" />
        </div>
      )}
      <h3 className="text-base font-bold text-surface-900 dark:text-white mb-1">{title}</h3>
      {description && <p className="text-sm text-surface-500 dark:text-surface-400 mb-6 max-w-sm">{description}</p>}
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}
