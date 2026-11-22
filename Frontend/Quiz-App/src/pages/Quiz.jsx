import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { canManage, useAuth } from '../auth/AuthContext';
import './QuizPages.css';

const Quiz = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const manager = canManage(user);
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ title: '', category: '', numQ: 5 });

  const load = async () => {
    try {
      const data = await api('/quiz/all');
      setQuizzes(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const createQuiz = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setBusy(true);
    try {
      const created = await api('/quiz/create', {
        method: 'POST',
        body: {
          title: form.title,
          category: form.category,
          numQ: Number(form.numQ)
        }
      });
      setMessage(`Created “${created.title}”.`);
      setForm({ title: '', category: '', numQ: 5 });
      await load();
    } catch (err) {
      setError(err.message === 'Request failed.'
        ? 'No questions found for that category. Add questions first.'
        : err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="quiz-page">
      <h1>Quizzes</h1>
      <p className="quiz-lead">
        {manager
          ? 'Create a quiz from questions in a category, then take it.'
          : 'Pick a quiz and answer every question.'}
      </p>

      <div className={manager ? 'quiz-grid' : ''}>
        {manager && (
          <form className="panel" onSubmit={createQuiz}>
            <h2>Create quiz</h2>
            <label htmlFor="quiz-title">Title</label>
            <input
              id="quiz-title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <label htmlFor="quiz-category">Category</label>
            <input
              id="quiz-category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="Same category used on the questions"
              required
            />
            <label htmlFor="quiz-count">Number of questions</label>
            <input
              id="quiz-count"
              type="number"
              min="1"
              max="20"
              value={form.numQ}
              onChange={(e) => setForm({ ...form, numQ: e.target.value })}
              required
            />
            <button className="primary-btn" type="submit" disabled={busy}>
              {busy ? 'Creating...' : 'Create quiz'}
            </button>
            {message && <p className="status">{message}</p>}
            {error && <p className="status error">{error}</p>}
          </form>
        )}

        <section className="panel">
          <h2>Available quizzes</h2>
          {!manager && error && <p className="status error">{error}</p>}
          {quizzes.length === 0 && <p className="quiz-lead">No quizzes yet.</p>}
          <div className="quiz-list">
            {quizzes.map((quiz) => (
              <article className="quiz-card" key={quiz.id}>
                <div>
                  <strong>{quiz.title}</strong>
                  <p className="quiz-lead">{quiz.questionsIds?.length || 0} questions</p>
                </div>
                <button className="primary-btn" onClick={() => navigate(`/quiz/get/${quiz.id}`)}>
                  Start
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Quiz;
