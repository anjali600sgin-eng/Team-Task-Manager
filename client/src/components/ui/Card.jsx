import clsx from 'clsx';

export default function Card({ children, hover = false, className, ...props }) {
  return (
    <div
      className={clsx(
        'bg-white rounded-xl border border-surface-200/80 shadow-card dark:bg-surface-900 dark:border-surface-800',
        hover && 'hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
