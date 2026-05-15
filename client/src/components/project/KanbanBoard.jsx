import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';

const columns = [
  { id: 'To Do', label: 'To Do', color: 'bg-amber-400', bg: 'bg-amber-50/50 dark:bg-amber-900/5' },
  { id: 'In Progress', label: 'In Progress', color: 'bg-primary-500', bg: 'bg-primary-50/50 dark:bg-primary-900/5' },
  { id: 'Done', label: 'Done', color: 'bg-emerald-500', bg: 'bg-emerald-50/50 dark:bg-emerald-900/5' },
];

export default function KanbanBoard({ tasks, isAdmin, onStatusChange, onEdit, onDelete, onTaskClick }) {
  const tasksByStatus = {
    'To Do': tasks.filter(t => t.status === 'To Do'),
    'In Progress': tasks.filter(t => t.status === 'In Progress'),
    'Done': tasks.filter(t => t.status === 'Done'),
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    onStatusChange?.(draggableId, destination.droppableId);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex md:grid md:grid-cols-3 gap-3 min-h-[400px] overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
        {columns.map((col) => (
          <div key={col.id} className={`rounded-xl ${col.bg} border border-surface-200/50 dark:border-surface-800 p-3 min-w-[280px] snap-center flex-shrink-0 md:min-w-0 md:flex-shrink`}>
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className={`w-2 h-2 rounded-full ${col.color}`} />
              <h3 className="text-xs font-bold uppercase tracking-wide text-surface-600 dark:text-surface-400">{col.label}</h3>
              <span className="text-[10px] font-bold text-surface-400 bg-white dark:bg-surface-800 px-1.5 py-0.5 rounded">
                {tasksByStatus[col.id].length}
              </span>
            </div>

            <Droppable droppableId={col.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`space-y-2 min-h-[100px] rounded-lg transition-colors p-1 ${
                    snapshot.isDraggingOver ? 'bg-surface-100/50 dark:bg-surface-800/50' : ''
                  }`}
                >
                  {tasksByStatus[col.id].map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps}>
                          <TaskCard task={task} compact isAdmin={isAdmin} onEdit={onEdit} onDelete={onDelete} onClick={() => onTaskClick?.(task)} dragHandleProps={provided.dragHandleProps} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}
