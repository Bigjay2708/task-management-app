'use client';

import { useState, useEffect } from 'react';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { ITask } from '@/models/Task';

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/tasks');
      
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      
      const data = await response.json();
      setTasks(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Create a new task
  const handleCreateTask = async (newTask: Partial<ITask>) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create task');
      }
      
      const createdTask = await response.json();
      setTasks((prevTasks) => [createdTask, ...prevTasks]);
    } catch (err) {
      console.error('Error creating task:', err);
      setError('Failed to create task. Please try again.');
    }
  };

  // Update an existing task
  const handleUpdateTask = async (updatedTask: Partial<ITask>) => {
    try {
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
      
      const updated = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === updated._id ? updated : task))
      );
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Failed to update task. Please try again.');
    }
  };

  // Delete a task
  const handleDeleteTask = async (id: string) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Failed to delete task. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Task Management App</h1>
          <p className="text-gray-600">Keep track of your tasks efficiently</p>
        </header>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <span className="block sm:inline">{error}</span>
            <button
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
              onClick={() => setError(null)}
            >
              <span className="sr-only">Dismiss</span>
              <span className="text-2xl">&times;</span>
            </button>
          </div>
        )}

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Task</h2>
          <TaskForm onSubmit={handleCreateTask} />
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Your Tasks</h2>
            <button
              onClick={fetchTasks}
              className="text-sm bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12 bg-white rounded-lg shadow">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <TaskList
              tasks={tasks}
              onEdit={handleUpdateTask}
              onDelete={handleDeleteTask}
            />
          )}
        </section>
      </div>
    </main>
  );
}
