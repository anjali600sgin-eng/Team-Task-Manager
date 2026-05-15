import { Menu, Zap } from 'lucide-react';

export default function MobileHeader({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800 lg:hidden">
      <div className="flex items-center gap-3 px-4 h-14">
        <button
          onClick={onMenuClick}
          className="p-1.5 rounded-lg text-surface-500 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-sm text-surface-900 dark:text-white">TaskFlow</span>
        </div>
      </div>
    </header>
  );
}
