import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const linkClass = (path) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      location.pathname === path
        ? 'bg-primary-700 text-white'
        : 'text-primary-100 hover:bg-primary-500'
    }`;

  return (
    <nav className="bg-primary-600 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-white font-bold text-lg">TaskFlow</Link>
            <Link to="/" className={linkClass('/')}>Dashboard</Link>
            <Link to="/projects" className={linkClass('/projects')}>Projects</Link>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-primary-100 text-sm">{user?.name}</span>
            <button onClick={logout} className="bg-primary-700 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-primary-800 transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
