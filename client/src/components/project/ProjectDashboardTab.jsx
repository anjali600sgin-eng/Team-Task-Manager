import Card from '../ui/Card';
import Badge from '../ui/Badge';
import ProgressRing from '../ui/ProgressRing';

const statusBarColors = {
  'To Do': 'bg-amber-400',
  'In Progress': 'bg-primary-500',
  'Done': 'bg-emerald-500',
};

export default function ProjectDashboardTab({ stats }) {
  if (!stats) return null;

  const completionRate = stats.totalTasks > 0
    ? ((stats.tasksByStatus['Done'] || 0) / stats.totalTasks) * 100
    : 0;

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 mb-5">
        <Card className="p-4 border-t-2 border-t-primary-500">
          <p className="text-[10px] font-bold uppercase tracking-widest text-surface-400">Total Tasks</p>
          <p className="text-2xl font-bold text-surface-900 dark:text-white mt-1">{stats.totalTasks}</p>
        </Card>
        <Card className="p-4 border-t-2 border-t-red-500">
          <p className="text-[10px] font-bold uppercase tracking-widest text-surface-400">Overdue</p>
          <p className="text-2xl font-bold text-surface-900 dark:text-white mt-1">{stats.overdueTasks}</p>
        </Card>
        <Card className="p-4 border-t-2 border-t-emerald-500">
          <p className="text-[10px] font-bold uppercase tracking-widest text-surface-400">Completed</p>
          <p className="text-2xl font-bold text-surface-900 dark:text-white mt-1">{stats.tasksByStatus['Done'] || 0}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-bold text-surface-900 dark:text-white">Tasks by Status</h3>
            <ProgressRing percentage={completionRate} size={48} strokeWidth={4} />
          </div>
          {Object.entries(stats.tasksByStatus).map(([status, count]) => (
            <div key={status} className="flex items-center justify-between py-2">
              <Badge variant="status" value={status} />
              <div className="flex items-center gap-3 flex-1 ml-4">
                <div className="flex-1 bg-surface-100 dark:bg-surface-800 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full transition-all duration-500 ${statusBarColors[status]}`} style={{ width: `${stats.totalTasks ? (count / stats.totalTasks) * 100 : 0}%` }} />
                </div>
                <span className="text-xs font-bold text-surface-600 dark:text-surface-400 w-5 text-right">{count}</span>
              </div>
            </div>
          ))}
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-bold text-surface-900 dark:text-white mb-4">Tasks per Member</h3>
          {Object.entries(stats.tasksPerUser).map(([name, count]) => (
            <div key={name} className="flex items-center justify-between py-2">
              <span className="text-sm text-surface-700 dark:text-surface-300 font-medium">{name}</span>
              <div className="flex items-center gap-3 flex-1 ml-4">
                <div className="flex-1 bg-surface-100 dark:bg-surface-800 rounded-full h-1.5">
                  <div className="bg-primary-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${stats.totalTasks ? (count / stats.totalTasks) * 100 : 0}%` }} />
                </div>
                <span className="text-xs font-bold text-surface-600 dark:text-surface-400 w-5 text-right">{count}</span>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
