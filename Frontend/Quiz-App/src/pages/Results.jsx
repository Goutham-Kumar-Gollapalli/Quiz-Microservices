import React from 'react';
import { loadResults } from '../api';
import { useAuth } from '../auth/AuthContext';
import './QuizPages.css';

const Results = ({ leaderboard = false }) => {
  const { user } = useAuth();
  const results = loadResults().filter((item) => leaderboard || item.email === user.email);

  return (
    <div className="quiz-page">
      <h1>{leaderboard ? 'Leaderboard' : 'My results'}</h1>
      <p className="quiz-lead">
        Scores from quizzes taken in this browser.
      </p>
      {results.length === 0 && <p className="quiz-lead">No scores yet. Take a quiz first.</p>}
      <div className="quiz-list">
        {results.map((item, index) => (
          <article className="quiz-card" key={`${item.takenAt}-${index}`}>
            <div>
              <strong>{item.name}</strong>
              <p className="quiz-lead">Quiz #{item.quizId}</p>
            </div>
            <strong>{item.score}/{item.total}</strong>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Results;
