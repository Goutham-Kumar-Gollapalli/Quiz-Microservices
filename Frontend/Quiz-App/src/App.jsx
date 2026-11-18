
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from 'react-router-dom';

import QuestionsForm from './pages/QuestionsForm';
import ViewQuestion from './components/ViewQuestion';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import QuizQuestion from './components/QuizQUestion';

import './App.css';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';

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

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },{
        
        path: '/about',
        element: <About/>
      
      },
      {
        
        path: '/login',
        element: <Login/>
      
      },{
        
        path: '/signup',
        element: <Signup/>
      },
      {
        path: '/add',
        element: <QuestionsForm />
      },
      {
        path: '/quiz',
        element: <QuizQuestion />
      },
      {
        path: '/view',
        element: <ViewQuestion />
      },
      {
        path: '/quiz/get/:id',
        element: <QuizQuestion />
      }
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
