
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { canManage, useAuth } from '../auth/AuthContext';
import { 
  Brain, 
  Trophy, 
  Zap, 
  Target, 
  ArrowRight,
  CircleHelp
} from 'lucide-react';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const startQuiz = () => {
    navigate(user ? '/quiz' : '/login');
  };

  return (
    <div className="home-container">
      <div className="home-glow glow-one"></div>
      <div className="home-glow glow-two"></div>

      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Zap size={16} />
            <span>LEARN. PLAY. CONQUER.</span>
          </div>

          <h1>
            Challenge Your
            <span className="gradient-text"> Mind.</span>
            <br />
            Own the <span className="gradient-text">Quiz.</span>
          </h1>

          <p className="hero-description">
            Put your knowledge to the test, sharpen your skills,
            and discover how much you really know with QuizBattle.
          </p>

          <div className="hero-buttons">
            <button className="start-button" onClick={startQuiz}>
              Start Quiz
              <ArrowRight size={19} />
            </button>

            <button
              className="explore-button"
              onClick={() => navigate(canManage(user) ? '/view' : user ? '/quiz' : '/signup')}
            >
              {canManage(user) ? 'Manage Questions' : user ? 'Your Quizzes' : 'Create Account'}
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <Brain size={21} />
              <div>
                <strong>Learn</strong>
                <span>Something new</span>
              </div>
            </div>

            <div className="stat-item">
              <Target size={21} />
              <div>
                <strong>Improve</strong>
                <span>Every attempt</span>
              </div>
            </div>

            <div className="stat-item">
              <Trophy size={21} />
              <div>
                <strong>Achieve</strong>
                <span>Your best score</span>
              </div>
            </div>
          </div>
        </div>

        <div className="quiz-card-wrapper">
          <div className="floating-icon floating-icon-one">
            <Brain size={27} />
          </div>

          <div className="floating-icon floating-icon-two">
            <Trophy size={26} />
          </div>

          <div className="quiz-preview-card">
            <div className="preview-top">
              <div className="preview-icon">
                <CircleHelp size={24} />
              </div>
              <span className="preview-label">YOUR NEXT CHALLENGE</span>
            </div>

            <div className="preview-divider"></div>

            <h2>Ready to test your knowledge?</h2>
            <p>Every question is a chance to level up.</p>

            <div className="preview-progress">
              <div className="progress-label">
                <span>Your journey</span>
                <span>Let's begin!</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill"></div>
              </div>
            </div>

            <div className="preview-footer">
              <span><CircleHelp size={16} /> 10 Questions</span>
              <span><Zap size={16} /> 10 Points</span>
            </div>
          </div>

          <div className="hero-decoration decoration-one"></div>
          <div className="hero-decoration decoration-two"></div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-heading">
          <span>WHY QUIZBATTLE?</span>
          <h2>Make every answer count.</h2>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon purple-icon">
              <Brain size={25} />
            </div>
            <h3>Expand Your Mind</h3>
            <p>Discover new facts and strengthen your knowledge with every quiz.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon blue-icon">
              <Target size={25} />
            </div>
            <h3>Challenge Yourself</h3>
            <p>Test your understanding and push yourself to do better.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon orange-icon">
              <Trophy size={25} />
            </div>
            <h3>Celebrate Progress</h3>
            <p>Every correct answer brings you one step closer to your goals.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
