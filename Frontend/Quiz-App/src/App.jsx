import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from 'react-router-dom';

import QuestionsForm from './pages/QuestionsForm';
import ViewQuestion from './components/ViewQuestion';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import QuizQuestion from './components/QuizQuestion';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { canManage, useAuth } from './auth/AuthContext';

import './App.css';

const Layout = () => {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function RequireAuth({ children, teacher = false }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (teacher && !canManage(user)) return <Navigate to="/quiz" replace />;
  return children;
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      {
        path: '/add',
        element: <RequireAuth teacher><QuestionsForm /></RequireAuth>
      },
      {
        path: '/quiz',
        element: <RequireAuth><Quiz /></RequireAuth>
      },
      {
        path: '/view',
        element: <RequireAuth teacher><ViewQuestion /></RequireAuth>
      },
      {
        path: '/quiz/get/:id',
        element: <RequireAuth><QuizQuestion /></RequireAuth>
      },
      {
        path: '/results',
        element: <RequireAuth><Results /></RequireAuth>
      },
      {
        path: '/leaderboard',
        element: <RequireAuth><Results leaderboard /></RequireAuth>
      }
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
