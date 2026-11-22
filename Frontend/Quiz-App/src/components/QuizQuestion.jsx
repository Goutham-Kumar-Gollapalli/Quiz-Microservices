import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api, saveResult } from '../api';
import { useAuth } from '../auth/AuthContext';
import '../pages/QuizPages.css';

const QuizQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');
  const [score, setScore] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api(`/quiz/get/${id}`)
      .then((data) => setQuestions(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message));
  }, [id]);

  const current = questions[index];

  const submit = async () => {
    setBusy(true);
    setError('');
    try {
      const payload = questions.map((question) => ({
        quizId: question.id,
        response: answers[question.id] || ''
      }));
      const result = await api(`/quiz/submit/${id}`, { method: 'POST', body: payload });
      setScore(result);
      saveResult({
        quizId: id,
        email: user.email,
        name: user.name,
        score: result,
        total: questions.length,
        takenAt: new Date().toISOString()
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  if (error && questions.length === 0) {
    return <div className="quiz-page"><p className="status error">{error}</p></div>;
  }
  if (!current && score === null) {
    return <div className="quiz-page"><h2>Loading...</h2></div>;
  }
  if (score !== null) {
    return (
      <div className="quiz-page">
        <section className="panel score-box">
          <h1>Quiz complete</h1>
          <strong>{score}/{questions.length}</strong>
          <p className="quiz-lead">Your score is saved in My Results.</p>
          <button className="primary-btn" onClick={() => navigate('/results')}>View results</button>
        </section>
      </div>
    );
  }

  const options = [current.option1, current.option2, current.option3, current.option4];

  return (
    <div className="quiz-page">
      <p className="quiz-lead">Question {index + 1} of {questions.length}</p>
      <section className="panel">
        <h2>{current.questionTitle}</h2>
        {options.map((option) => (
          <label
            key={option}
            className={`option-row ${answers[current.id] === option ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name={`answer-${current.id}`}
              checked={answers[current.id] === option}
              onChange={() => setAnswers({ ...answers, [current.id]: option })}
            />
            {option}
          </label>
        ))}
        {error && <p className="status error">{error}</p>}
        <div className="quiz-actions">
          <button className="ghost-btn" disabled={index === 0} onClick={() => setIndex(index - 1)}>
            Previous
          </button>
          {index < questions.length - 1 ? (
            <button className="primary-btn" onClick={() => setIndex(index + 1)}>Next</button>
          ) : (
            <button className="primary-btn" disabled={busy} onClick={submit}>
              {busy ? 'Submitting...' : 'Submit'}
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default QuizQuestion;
