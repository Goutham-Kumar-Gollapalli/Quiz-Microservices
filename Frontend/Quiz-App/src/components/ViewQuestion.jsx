import React, { useEffect, useState } from 'react';
import { api } from '../api';
import '../pages/QuizPages.css';

const ViewQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/question/all')
      .then((data) => setQuestions(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="quiz-page">
      <h1>Questions</h1>
      {error && <p className="status error">{error}</p>}
      {questions.length === 0 && !error && <p className="quiz-lead">No questions yet.</p>}
      <div className="quiz-list">
        {questions.map((item) => (
          <article className="question-card" key={item.id}>
            <h2>{item.questionTitle}</h2>
            <p className="quiz-lead">Category: {item.category || 'General'}</p>
            <p>1. {item.option1}</p>
            <p>2. {item.option2}</p>
            <p>3. {item.option3}</p>
            <p>4. {item.option4}</p>
            <p>Correct answer: {item.correctAnswer}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ViewQuestion;
