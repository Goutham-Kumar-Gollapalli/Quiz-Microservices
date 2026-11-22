
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { canManage, useAuth } from '../auth/AuthContext';
import {
  Swords,
  Home,
  Info,
  LogIn,
  UserPlus,
  Brain,
  Trophy,
  CirclePlus,
  BookOpen,
  UserCircle,
  LogOut
} from 'lucide-react';

import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isManager = canManage(user);
  const isLoggedIn = Boolean(user);

  const linkClass = ({ isActive }) =>
    `nav-link ${isActive ? 'active' : ''}`;

  return (
    <header className="navbar">
      <NavLink to="/" className="nav-brand">
        <span className="brand-icon">
          <Swords size={27} />
        </span>
        <span>Quiz<span className="brand-highlight">Battle</span></span>
      </NavLink>

      <nav className="nav-links">
        <NavLink to="/" className={linkClass}>
          <Home size={17} />
          Home
        </NavLink>

        <NavLink to="/about" className={linkClass}>
          <Info size={17} />
          About Us
        </NavLink>

        {!isLoggedIn && (
          <>
            <NavLink to="/login" className={linkClass}>
              <LogIn size={17} />
              Login
            </NavLink>

            <NavLink to="/signup" className="nav-signup">
              <UserPlus size={17} />
              Sign Up
            </NavLink>
          </>
        )}

        {isLoggedIn && (
          <>
            <NavLink to="/quiz" className={linkClass}>
              <Brain size={17} />
              Take Quiz
            </NavLink>
            <NavLink to="/results" className={linkClass}>
              <Trophy size={17} />
              My Results
            </NavLink>
          </>
        )}

        {isLoggedIn && isManager && (
          <>
            <NavLink to="/add" className={linkClass}>
              <CirclePlus size={17} />
              Create Questions
            </NavLink>
            <NavLink to="/view" className={linkClass}>
              <BookOpen size={17} />
              Manage Questions
            </NavLink>
          </>
        )}
      </nav>

      {isLoggedIn && (
        <div className="nav-user">
          <UserCircle size={21} />
          <span className="user-name">
            {user.name || (isManager ? 'Teacher' : 'Student')}
          </span>
          <button className="logout-button" onClick={handleLogout}>
            <LogOut size={17} />
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
