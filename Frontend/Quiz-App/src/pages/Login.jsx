
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../auth/AuthContext';
import {
  Swords,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  Brain
} from 'lucide-react';

import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const data = await api('/auth/login', {
        method: 'POST',
        body: { email, password }
      });
      login(data);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-glow auth-glow-one"></div>
      <div className="auth-glow auth-glow-two"></div>

      <section className="auth-card">
        <div className="auth-brand">
          <div className="auth-brand-icon">
            <Swords size={28} />
          </div>
          <span>Quiz<span>Battle</span></span>
        </div>

        <div className="auth-heading">
          <div className="auth-small-icon">
            <Brain size={24} />
          </div>

          <h1>Welcome back!</h1>
          <p>Log in to continue your quiz journey.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="login-email">Email address</label>

          <div className="auth-input-wrapper">
            <Mail size={19} />
            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <label htmlFor="login-password">Password</label>

          <div className="auth-input-wrapper">
            <LockKeyhole size={19} />
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit" disabled={busy}>
            {busy ? 'Logging in...' : 'Log In'}
            <ArrowRight size={19} />
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>

        <div className="auth-bottom-note">
          <LockKeyhole size={14} />
          Your learning journey starts here.
        </div>
      </section>
    </div>
  );
};

export default Login;
