import React, { useState } from 'react';
import { api } from '../api';
import './QuizPages.css';

const emptyQuestion = {
  category: '',
  questionTitle: '',
  option1: '',
  option2: '',
  option3: '',
  option4: '',
  correctAnswer: ''
};

const QuestionsForm = () => {
  const [question, setQuestion] = useState(emptyQuestion);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  function handleChange(event) {
    setQuestion({ ...question, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    setError('');
    setBusy(true);
    try {
      await api('/question/add', { method: 'POST', body: question });
      setMessage('Question added.');
      setQuestion(emptyQuestion);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  const options = [question.option1, question.option2, question.option3, question.option4]
    .filter(Boolean);

  return (
    <div className="quiz-page">
      <h1>Add a question</h1>
      <p className="quiz-lead">Teachers use these questions when they create a quiz by category.</p>
      <form className="panel" onSubmit={handleSubmit}>
        <label htmlFor="category">Category</label>
        <input id="category" name="category" value={question.category} onChange={handleChange} required />

        <label htmlFor="questionTitle">Question</label>
        <input id="questionTitle" name="questionTitle" value={question.questionTitle} onChange={handleChange} required />

        {['option1', 'option2', 'option3', 'option4'].map((name, index) => (
          <div key={name}>
            <label htmlFor={name}>Option {index + 1}</label>
            <input id={name} name={name} value={question[name]} onChange={handleChange} required />
          </div>
        ))}

        <label htmlFor="correctAnswer">Correct answer</label>
        <select
          id="correctAnswer"
          name="correctAnswer"
          value={question.correctAnswer}
          onChange={handleChange}
          required
        >
          <option value="">Select the correct option</option>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        {message && <p className="status">{message}</p>}
        {error && <p className="status error">{error}</p>}
        <button className="primary-btn" type="submit" disabled={busy}>
          {busy ? 'Saving...' : 'Add question'}
        </button>
      </form>
    </div>
  );
};

export default QuestionsForm;
