# Task Management App

A responsive and functional task management application built with Next.js and MongoDB. This project is designed to showcase frontend and backend skills for a portfolio, without unnecessary features like authentication.

## Features

- Create, read, update, and delete tasks
- Filter tasks by status and priority
- Sort tasks by different criteria
- Responsive design that works on mobile and desktop
- MongoDB integration for data persistence

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Deployment**: Vercel (ready to deploy)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB instance (local or Atlas)

### Setup

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory with your MongoDB connection string:

```
MONGODB_URI=your_mongodb_connection_string
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

### Seed the Database

To populate the database with sample tasks:

```bash
node -r dotenv/config scripts/seed.js
```

## Deployment

This project is ready to be deployed to Vercel. Connect your GitHub repository to Vercel and it will automatically detect the Next.js project. Make sure to add your MongoDB connection string as an environment variable in the Vercel dashboard.

## Project Structure

- `/app` - Next.js app router pages and API routes
- `/components` - React components for the UI
- `/lib` - Utility functions and database connection
- `/models` - Mongoose models for MongoDB
- `/scripts` - Helper scripts for seeding data

## License

This project is open source and available under the MIT License.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
