# WADV Frontend

WADV Frontend is a modern React-based client application for managing tasks with authentication, protected routes, and real-time updates. This project is designed to work seamlessly with a backend API running on the same local environment.

## Overview

This frontend provides a clean and responsive interface for:

- User registration and login
- Protected dashboard access
- Task creation, editing, deletion, and filtering
- Real-time task synchronization via Socket.IO
- Profile management and user notifications

## Tech Stack

- React 19
- Vite 8
- React Router DOM
- Axios
- Socket.IO Client
- Tailwind CSS
- React Hook Form
- Lucide React
- ESLint

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js 18 or higher
- npm 9 or higher

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd wad-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Make sure the backend service is running on:
   ```text
   http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open the application in your browser:
   ```text
   http://localhost:5173
   ```

## Available Scripts

- `npm run dev` — starts the Vite development server
- `npm run build` — creates a production build
- `npm run preview` — previews the production build locally
- `npm run lint` — runs ESLint for code quality checks

## Project Structure

```text
src/
  components/      # Reusable UI components
  contexts/        # Auth, socket, and notification providers
  hooks/           # Custom React hooks
  lib/             # Shared utilities such as Axios and token storage
  pages/           # Page-level views (Login, Register, Tasks, Profile)
  services/        # API service modules
```

## API Configuration

The application uses Vite proxy settings to forward requests to the backend API:

- `/api` → `http://localhost:3000`
- `/auth` → `http://localhost:3000`

If your backend runs on a different port, update the proxy configuration in `vite.config.js`.

## Features

### Authentication
- Login, register, and logout flows
- JWT-based session handling with access and refresh tokens

### Task Management
- Create new tasks
- Edit existing tasks
- Delete tasks
- Filter tasks by status

### Real-Time Experience
- Real-time task updates through Socket.IO
- Toast notifications for user feedback

## Development Notes

- The app uses protected routes to restrict access to authenticated users.
- UI styling is handled with Tailwind CSS and utility classes.
- The codebase follows a modular structure to keep the frontend maintainable and scalable.

## Contribution

If you want to contribute, please create a feature branch and submit a pull request with clear documentation of your changes.
