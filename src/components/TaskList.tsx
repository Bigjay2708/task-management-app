import { useState } from 'react';
import { ITask } from '@/models/Task';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { ListFilter, SortDesc, X, Sliders } from 'lucide-react';
import { cn } from '@/lib/utils/ui';

interface TaskListProps {
  tasks: ITask[];
  onEdit: (task: Partial<ITask>) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  const [editingTask, setEditingTask] = useState<ITask | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Handler for editing a task
  const handleEdit = (task: ITask) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler for submitting edited task
  const handleEditSubmit = (updatedTask: Partial<ITask>) => {
    if (editingTask) {
      onEdit({ ...updatedTask, _id: editingTask._id });
      setEditingTask(null);
    }
  };

  // Handler for clearing filters
  const clearFilters = () => {
    setFilterStatus('all');
    setFilterPriority('all');
    setSortBy('createdAt');
  };

  // Filter tasks based on selected filters
  const filteredTasks = tasks.filter((task) => {
    const statusMatch = filterStatus === 'all' || task.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || task.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  // Sort tasks based on selected sort option
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'priority': {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority as keyof typeof priorityOrder] - 
               priorityOrder[b.priority as keyof typeof priorityOrder];
      }
      case 'dueDate':
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      case 'status': {
        const statusOrder = { todo: 0, 'in-progress': 1, completed: 2 };
        return statusOrder[a.status as keyof typeof statusOrder] - 
               statusOrder[b.status as keyof typeof statusOrder];
      }
      case 'createdAt':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  // Count tasks by status
  const taskCounts = {
    total: tasks.length,
    todo: tasks.filter(task => task.status === 'todo').length,
    inProgress: tasks.filter(task => task.status === 'in-progress').length,
    completed: tasks.filter(task => task.status === 'completed').length,
  };
  // Define input styles for reusability
  const selectClass = "w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5";

  return (
    <div className="space-y-6">
      {editingTask && (
        <div className="mb-8 animate-in fade-in slide-in-from-top-5 duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Edit Task</h2>            <button
              onClick={() => setEditingTask(null)}
              className="p-1.5 rounded-full bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-red-900 dark:hover:text-red-300 transition-colors"
              aria-label="Cancel editing"
            >
              <X size={16} />
            </button>
          </div>
          <TaskForm
            onSubmit={handleEditSubmit}
            initialData={editingTask}
            buttonText="Update Task"
          />
        </div>
      )}

      <div className="flex flex-col space-y-3">
        {/* Task statistics */}        <div className="flex flex-wrap gap-3 mb-2">
          <div className="flex-1 min-w-[120px] bg-white dark:bg-gray-800 shadow-sm rounded-lg p-3 border border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-600 dark:text-gray-400">Total Tasks</p>
            <p className="text-2xl font-semibold">{taskCounts.total}</p>
          </div>
          <div className="flex-1 min-w-[120px] bg-white dark:bg-gray-800 shadow-sm rounded-lg p-3 border border-gray-200 dark:border-gray-700">
            <p className="text-xs text-yellow-600">To Do</p>
            <p className="text-2xl font-semibold">{taskCounts.todo}</p>
          </div>
          <div className="flex-1 min-w-[120px] bg-white dark:bg-gray-800 shadow-sm rounded-lg p-3 border border-gray-200 dark:border-gray-700">
            <p className="text-xs text-blue-600">In Progress</p>
            <p className="text-2xl font-semibold">{taskCounts.inProgress}</p>
          </div>
          <div className="flex-1 min-w-[120px] bg-white dark:bg-gray-800 shadow-sm rounded-lg p-3 border border-gray-200 dark:border-gray-700">
            <p className="text-xs text-green-600">Completed</p>
            <p className="text-2xl font-semibold">{taskCounts.completed}</p>
          </div>
        </div>

        {/* Filter toggle button */}
        <div className="flex justify-between items-center">
          <button            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "flex items-center gap-2 text-sm font-medium",
              "px-3 py-1.5 rounded-lg transition-colors",
              "border border-gray-200 dark:border-gray-700",
              showFilters 
                ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" 
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            )}
          >
            {showFilters ? <X size={16} /> : <Sliders size={16} />}
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          
          {(filterStatus !== 'all' || filterPriority !== 'all' || sortBy !== 'createdAt') && (
            <button
              onClick={clearFilters}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1"
            >
              <X size={14} />
              Clear Filters
            </button>
          )}
        </div>        {/* Filters panel */}
        {showFilters && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="filterStatus" className={labelClass}>
                  <ListFilter className="w-3.5 h-3.5 inline mr-1" />
                  Filter by Status
                </label>
                <select
                  id="filterStatus"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={selectClass}
                >
                  <option value="all">All Statuses</option>
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label htmlFor="filterPriority" className={labelClass}>
                  <ListFilter className="w-3.5 h-3.5 inline mr-1" />
                  Filter by Priority
                </label>
                <select
                  id="filterPriority"
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className={selectClass}
                >
                  <option value="all">All Priorities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label htmlFor="sortBy" className={labelClass}>
                  <SortDesc className="w-3.5 h-3.5 inline mr-1" />
                  Sort by
                </label>
                <select
                  id="sortBy"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={selectClass}
                >
                  <option value="createdAt">Date Created (Newest)</option>
                  <option value="title">Title</option>
                  <option value="priority">Priority</option>
                  <option value="dueDate">Due Date</option>
                  <option value="status">Status</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>      {/* Task list */}
      {sortedTasks.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
            <Sliders className="w-8 h-8 text-gray-500 dark:text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">No tasks found</h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            {tasks.length === 0
              ? 'Get started by adding your first task above!'
              : 'No tasks match your current filters. Try adjusting your filter criteria.'}
          </p>
        </div>
      ) : (        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTasks.map((task) => (
            <TaskCard
              key={task._id?.toString()}
              task={task}
              onEdit={handleEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
