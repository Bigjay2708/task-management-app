import { useState, FormEvent } from 'react';
import { ITask } from '@/models/Task';
import { CheckCircle2, Clock, Flag } from 'lucide-react';
import { cn } from '@/lib/utils/ui';

interface TaskFormProps {
  onSubmit: (task: Partial<ITask>) => void;
  initialData?: Partial<ITask>;
  buttonText?: string;
}

export default function TaskForm({ onSubmit, initialData, buttonText = 'Add Task' }: TaskFormProps) {
  const [formData, setFormData] = useState<Partial<ITask>>(
    initialData || {
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      dueDate: undefined,
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    
    // Reset form if it's a new task form
    if (!initialData) {
      setFormData({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        dueDate: undefined,
      });
    }
  };
  // Define input styles for reusability
  const inputClass = "w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 transform focus:scale-105";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 animate-slide-in";
  const selectClass = "w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none transform focus:scale-105";
  
  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 animate-fade-in">
      <div className="animate-slide-up">
        <label htmlFor="title" className={labelClass}>
          Title<span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="What needs to be done?"
          />
        </div>
      </div>

      <div className="animate-slide-up">
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className={inputClass}
          placeholder="Add details about this task..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-slide-up">
        <div>
          <label htmlFor="status" className={labelClass}>
            Status
          </label>
          <div className="relative">
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <CheckCircle2 className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="priority" className={labelClass}>
            Priority
          </label>
          <div className="relative">
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Flag className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="dueDate" className={labelClass}>
            Due Date
          </label>
          <div className="relative">
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate ? new Date(formData.dueDate).toISOString().split('T')[0] : ''}
              onChange={handleChange}
              className={inputClass}
            />            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Clock className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-3 animate-bounce-in">        <button
          type="submit"
          className={cn(
            "w-full bg-blue-600 text-white font-medium py-3 px-5 rounded-lg",
            "hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            "shadow-sm flex items-center justify-center gap-2",
            "dark:bg-blue-700 dark:hover:bg-blue-600",
            "active:scale-95"
          )}
        >
          {initialData ? (
            <>
              <CheckCircle2 className="h-4 w-4 animate-pulse-subtle" />
              {buttonText}
            </>
          ) : (
            <>
              <span className="text-lg transform transition-transform duration-300 hover:rotate-180">+</span>
              {buttonText}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
