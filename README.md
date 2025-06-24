# Task Management App

A modern task management application built with Next.js, React, TypeScript, and MongoDB. The app features a responsive design and dark mode support to provide a great user experience on any device.

## Features

- Create, read, update, and delete tasks
- Responsive design for desktop and mobile
- Dark mode / light mode support
- Task priority levels
- MongoDB Atlas integration for data persistence
- RESTful API for task management

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes with MongoDB integration
- **Database**: MongoDB Atlas
- **Deployment**: Vercel

## Live Demo

You can access the live application at: [Task Management App](https://task-management-f81yzvshe-bigjays-projects.vercel.app)

## How It Works

### Task Management

- **Create Tasks**: Add new tasks with title, description, priority, and status
- **Update Tasks**: Edit task details or mark tasks as complete
- **Delete Tasks**: Remove tasks from your list
- **Task Listing**: View all your tasks in a clean interface

### UI/UX Features

- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Dark/Light Mode**: Toggle between dark and light themes
- **Loading States**: Visual feedback during API operations
- **Error Handling**: User-friendly error notifications

## Project Structure

- `/app` - Next.js app router pages and API routes
- `/components` - React components including TaskForm, TaskCard, and TaskList
- `/lib` - MongoDB connection utilities
- `/models` - Mongoose Task model with schema definition
- `/api` - RESTful API endpoints for CRUD operations

## Implementation Details

- **State Management**: React useState and useEffect for client-side state
- **API Integration**: Fetch API for REST endpoint communication
- **Styling**: Tailwind CSS for responsive design and dark mode
- **Database**: MongoDB Task collection with Mongoose ODM
- **Deployment**: Optimized build on Vercel's edge network

## License

This project is open source and available under the MIT License.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
