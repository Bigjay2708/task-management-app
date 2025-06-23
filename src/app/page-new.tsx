'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { ITask } from '@/models/Task';

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/tasks');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        setTasks(data);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching tasks';
        setError(errorMessage);
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Create task function
  const createTask = async (taskData: Partial<ITask>) => {
    try {
      setLoading(true);
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      const newTask = await response.json();
      setTasks([newTask, ...tasks]);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while creating the task';
      setError(errorMessage);
      console.error('Error creating task:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update task function
  const updateTask = async (updatedTask: Partial<ITask>) => {
    try {
      if (!updatedTask._id) return;
      setLoading(true);
      
      const response = await fetch(`/api/tasks/${updatedTask._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const result = await response.json();
      
      setTasks(tasks.map(task => 
        task._id === updatedTask._id ? result : task
      ));
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while updating the task';
      setError(errorMessage);
      console.error('Error updating task:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete task function
  const deleteTask = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      setTasks(tasks.filter(task => task._id !== id));
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while deleting the task';
      setError(errorMessage);
      console.error('Error deleting task:', err);
    } finally {
      setLoading(false);
    }
  };

  // Clear error message
  const clearError = () => setError(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Task Management</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Error message */}
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-800 text-red-800 dark:text-red-300 rounded-lg p-4">
            <div className="flex items-center">
              <div>
                <h3 className="text-sm font-medium">Error</h3>
                <div className="mt-1 text-sm">{error}</div>
              </div>
              <button 
                onClick={clearError}
                className="ml-auto text-red-500"
                aria-label="Dismiss"
              >
                &times;
              </button>
            </div>
          </div>
        )}

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8">
          {/* Task creation section */}
          <section>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Create New Task
                </h2>
              </div>
              <TaskForm onSubmit={createTask} />
            </div>
          </section>

          {/* Task list section */}
          <section>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Your Tasks
              </h2>
            </div>
            
            <TaskList
              tasks={tasks}
              onEdit={updateTask}
              onDelete={deleteTask}
            />
          </section>
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 mt-12">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Task Management App
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
