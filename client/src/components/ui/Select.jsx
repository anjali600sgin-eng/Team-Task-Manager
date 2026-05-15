import clsx from 'clsx';

export default function Select({ label, error, children, className, ...props }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wide text-surface-500 dark:text-surface-400 mb-1.5">{label}</label>
      )}
      <select
        className={clsx(
          'w-full px-3 py-2.5 bg-surface-50 dark:bg-surface-800 border rounded-lg text-sm transition-all duration-150 appearance-none',
          'text-surface-900 dark:text-surface-100',
          'focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 focus:bg-white dark:focus:bg-surface-900',
          error ? 'border-red-300 dark:border-red-700' : 'border-surface-200 dark:border-surface-700'
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
