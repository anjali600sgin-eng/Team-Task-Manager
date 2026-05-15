import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Zap, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Logged in successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[45%] bg-surface-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-warm-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/4 left-1/3 w-px h-40 bg-gradient-to-b from-transparent via-surface-700 to-transparent" />
        <div className="absolute top-1/2 right-1/4 w-40 h-px bg-gradient-to-r from-transparent via-surface-700 to-transparent" />

        <div className="relative z-10 flex flex-col justify-between py-12 px-12 xl:px-16 w-full">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-lg">TaskFlow</span>
          </div>

          <div>
            <h1 className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-3">
              Organize work.<br />Ship faster.
            </h1>
            <p className="text-surface-400 text-base max-w-sm leading-relaxed">
              Manage projects, assign tasks, and track your team's progress — all in one clean workspace.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { num: '100%', label: 'Free' },
                { num: 'Live', label: 'Sync' },
                { num: 'Secure', label: 'RBAC' },
              ].map((s) => (
                <div key={s.label} className="border border-surface-800 rounded-lg px-3 py-3">
                  <p className="text-white font-bold text-lg">{s.num}</p>
                  <p className="text-surface-500 text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-surface-600 text-xs">Built with MERN Stack</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white dark:bg-surface-950">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-surface-900 dark:text-white">TaskFlow</span>
          </div>

          <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-1">Welcome back</h2>
          <p className="text-sm text-surface-500 dark:text-surface-400 mb-8">Sign in to continue to your workspace</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 bottom-2.5 text-surface-400 hover:text-surface-600 p-0.5"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <Button type="submit" loading={loading} className="w-full">
              Sign In <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-surface-500 dark:text-surface-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
