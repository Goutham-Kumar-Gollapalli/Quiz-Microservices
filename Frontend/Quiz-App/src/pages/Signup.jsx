
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../auth/AuthContext';
import {
  Swords,
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  Brain
} from 'lucide-react';

import './Auth.css';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('STUDENT');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must contain at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setBusy(true);
    try {
      const data = await api('/auth/register', {
        method: 'POST',
        body: { name, email, password, role }
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

      <section className="auth-card signup-card">
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

          <h1>Create an account</h1>
          <p>Join QuizBattle and put your knowledge to the test.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="signup-name">Full name</label>

          <div className="auth-input-wrapper">
            <UserRound size={19} />
            <input
              id="signup-name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </div>

          <label htmlFor="signup-email">Email address</label>

          <div className="auth-input-wrapper">
            <Mail size={19} />
            <input
              id="signup-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <label htmlFor="role">I want to join as</label>

      <select
        id="role"
        name="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      >
        <option value="STUDENT">Student</option>
        <option value="TEACHER">Teacher</option>
      </select>

          <label htmlFor="signup-password">Password</label>

          <div className="auth-input-wrapper">
            <LockKeyhole size={19} />
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              minLength={8}
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

          <label htmlFor="signup-confirm-password">
            Confirm password
          </label>

          <div className="auth-input-wrapper">
            <LockKeyhole size={19} />
            <input
              id="signup-confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              aria-label={
                showConfirmPassword ? 'Hide password' : 'Show password'
              }
            >
              {showConfirmPassword
                ? <EyeOff size={19} />
                : <Eye size={19} />}
            </button>
          </div>

          <p className="auth-helper">
            Use at least 8 characters for your password.
          </p>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit" disabled={busy}>
            {busy ? 'Creating account...' : 'Create Account'}
            <ArrowRight size={19} />
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>

        <div className="auth-bottom-note">
          <LockKeyhole size={14} />
          Create your student account to get started.
        </div>
      </section>
    </div>
  );
};

export default Signup;
