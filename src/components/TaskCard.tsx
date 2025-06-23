import { format } from 'date-fns';
import { ITask } from '@/models/Task';
import { 
  Trash2, Edit, Clock, Flag, 
  CheckCircle2, Circle, ArrowRightCircle
} from 'lucide-react';
import { 
  getStatusColor, getPriorityColor, 
  getStatusText, truncateText 
} from '@/lib/utils/ui';

interface TaskCardProps {
  task: ITask;
  onEdit: (task: ITask) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {  // Get status icon based on task status
  const StatusIcon = () => {
    switch(task.status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'in-progress':
        return <ArrowRightCircle className="w-4 h-4 text-blue-600" />;
      default:
        return <Circle className="w-4 h-4 text-yellow-600" />;
    }
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col h-full">
        {/* Card header with status indicator */}
        <div className={`px-4 py-2 flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 ${getStatusColor(task.status)}`}>
          <StatusIcon />
          <span className="text-xs font-semibold">
            {getStatusText(task.status)}
          </span>
        </div>
        
        {/* Card content */}
        <div className="p-5 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">
              {task.title}
            </h3>
            <div className="flex space-x-2 ml-2">              <button
                onClick={() => onEdit(task)}
                className="p-1.5 rounded-full bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-blue-900 dark:hover:text-blue-300 transition-colors"
                aria-label="Edit task"
              >
                <Edit size={14} />
              </button>
              <button
                onClick={() => onDelete(task._id as string)}
                className="p-1.5 rounded-full bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-red-900 dark:hover:text-red-300 transition-colors"
                aria-label="Delete task"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow line-clamp-2">
            {task.description ? truncateText(task.description, 120) : 'No description provided'}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-gray-100 dark:border-gray-700">
            <div className={`flex items-center text-xs font-medium ${getPriorityColor(task.priority)}`}>
              <Flag className="w-3 h-3 mr-1" />
              <span>{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
            </div>
            
            {task.dueDate && (
              <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 ml-auto">
                <Clock className="w-3 h-3 mr-1" />
                <span>Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
