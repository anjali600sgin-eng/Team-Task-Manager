import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { LayoutDashboard, FolderKanban, LogOut, Zap, Sun, Moon } from 'lucide-react';
import Avatar from '../ui/Avatar';
import clsx from 'clsx';

const navLinks = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/projects', label: 'Projects', icon: FolderKanban },
];

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const location = useLocation();

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-surface-900/40 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-50 w-60 bg-white dark:bg-surface-900 border-r border-surface-200 dark:border-surface-800 flex flex-col transition-transform duration-300 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 h-14 border-b border-surface-100 dark:border-surface-800">
          <div className="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-surface-900 dark:text-white font-bold text-base">TaskFlow</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 space-y-0.5">
          <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-surface-400">Menu</p>
          {navLinks.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                onClick={onClose}
                className={clsx(
                  'flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150',
                  active
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                    : 'text-surface-500 hover:text-surface-900 hover:bg-surface-50 dark:text-surface-400 dark:hover:text-white dark:hover:bg-surface-800'
                )}
              >
                <Icon className={clsx('w-[18px] h-[18px]', active && 'text-primary-500')} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Theme toggle */}
        <div className="px-3 pb-1">
          <button
            onClick={toggle}
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-[13px] font-medium text-surface-500 hover:text-surface-900 hover:bg-surface-50 dark:text-surface-400 dark:hover:text-white dark:hover:bg-surface-800 transition-all duration-150"
          >
            {dark ? <Sun className="w-[18px] h-[18px] text-warm-500" /> : <Moon className="w-[18px] h-[18px]" />}
            {dark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        {/* User section */}
        <div className="px-3 py-3 border-t border-surface-100 dark:border-surface-800">
          <div className="flex items-center gap-2.5">
            <Avatar name={user?.name || '?'} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-surface-900 dark:text-white truncate">{user?.name}</p>
              <p className="text-[11px] text-surface-400 truncate">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="p-1.5 rounded-lg text-surface-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
