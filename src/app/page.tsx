'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { ITask } from '@/models/Task';
import { CheckCircle, ListTodo, Menu, Moon, Sun } from 'lucide-react';

export default function Home() {
  // State hooks
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

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
        setTasks(data);      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching tasks';
        setError(errorMessage);
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);
  // Handle dark mode toggle
  useEffect(() => {
    // Check for user's preferred color scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
    
    // Apply initial dark mode class
    document.documentElement.classList.toggle('dark', prefersDark);
    if (prefersDark) {
      document.documentElement.setAttribute('class', 'dark h-full');
    } else {
      document.documentElement.setAttribute('class', 'h-full');
    }
  }, []);
  
  // Toggle dark mode function
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    // Apply the dark class directly
    if (newDarkMode) {
      document.documentElement.setAttribute('class', 'dark h-full');
    } else {
      document.documentElement.setAttribute('class', 'h-full');
    }
  };

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
      setTasks([newTask, ...tasks]);    } catch (err: unknown) {
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
      ));    } catch (err: unknown) {
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

      setTasks(tasks.filter(task => task._id !== id));    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while deleting the task';
      setError(errorMessage);
      console.error('Error deleting task:', err);
    } finally {
      setLoading(false);
    }
  };

  // Clear error message
  const clearError = () => setError(null);
  // Apply dark mode to the html element on mount if user prefers dark
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 animate-fade-in">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 animate-slide-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center animate-slide-in">
              <div className="flex-shrink-0 bg-blue-600 text-white p-2 rounded-lg transform transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <ListTodo className="h-5 w-5" />
              </div>
              <h1 className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
                Task Management
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">          <button
                onClick={toggleDarkMode}
                className="rounded-full p-2 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition-all duration-300 hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="h-5 w-5 animate-spin" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition-all duration-300 hover:scale-110"
                aria-label="Open main menu"
              >
                <Menu className={`h-6 w-6 transform transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 animate-slide-up">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={toggleDarkMode}
                className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transform transition-all duration-200 hover:translate-x-2"
              >
                {darkMode ? <Sun className="h-5 w-5 mr-3" /> : <Moon className="h-5 w-5 mr-3" />}
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {/* Error message */}
        {error && (
          <div className="mb-8 bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-800 text-red-800 dark:text-red-300 rounded-lg p-4 flex items-start justify-between animate-shake">
            <div className="flex items-center space-x-3">
              <span className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 dark:bg-red-800 flex items-center justify-center animate-pulse">
                <svg className="h-5 w-5 text-red-600 dark:text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </span>
              <div>
                <h3 className="text-sm font-medium">Error</h3>
                <div className="mt-1 text-sm">{error}</div>
              </div>
            </div>
            <button 
              onClick={clearError}
              className="flex-shrink-0 ml-4 text-red-500 hover:text-red-700 dark:hover:text-red-300 transform transition-all duration-200 hover:scale-110"
              aria-label="Dismiss"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-center my-8 animate-bounce-in">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-10">
          {/* Task creation section */}
          <section className="animate-slide-up">            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 transform transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center animate-slide-in">
                  <CheckCircle className="mr-2 h-6 w-6 text-blue-600 animate-pulse-subtle" />
                  Create New Task
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Add a new task to your list with details and priority
                </p>
              </div>
              <TaskForm onSubmit={createTask} />
            </div>
          </section>

          {/* Task list section */}
          <section className="animate-slide-up">
            <div className="mb-6 animate-slide-in">              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <ListTodo className="mr-2 h-6 w-6 text-blue-600 animate-pulse-subtle" />
                Your Tasks
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage, filter and update your task list
              </p>
            </div>
            
            <div className="animate-fade-in">
              <TaskList
                tasks={tasks}
                onEdit={updateTask}
                onDelete={deleteTask}
              />
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 mt-16 animate-slide-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm animate-fade-in">
            &copy; {new Date().getFullYear()} Task Management App. Built with Next.js and MongoDB.
          </p>
        </div>
      </footer>
    </div>
  );
}
