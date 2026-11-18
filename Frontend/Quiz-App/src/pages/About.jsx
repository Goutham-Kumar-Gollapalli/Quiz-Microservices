
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Swords,
  Brain,
  Target,
  Trophy,
  Users,
  Zap,
  ArrowRight,
  Lightbulb,
  Heart
} from 'lucide-react';

import './About.css';

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: 'Learn Something New',
      description:
        'Explore questions across different topics and expand your knowledge with every quiz.',
      style: 'purple'
    },
    {
      icon: Target,
      title: 'Challenge Yourself',
      description:
        'Test your knowledge, improve your accuracy, and push yourself to achieve better scores.',
      style: 'cyan'
    },
    {
      icon: Trophy,
      title: 'Celebrate Success',
      description:
        'Track your performance, celebrate your progress, and aim for your personal best.',
      style: 'orange'
    }
  ];

  return (
    <div className="about-page">
      <div className="about-glow about-glow-one"></div>
      <div className="about-glow about-glow-two"></div>

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-label">
          <Swords size={17} />
          <span>THE STORY BEHIND QUIZBATTLE</span>
        </div>

        <h1>
          Knowledge is power.
          <br />
          <span className="about-gradient">Make it your superpower.</span>
        </h1>

        <p className="about-hero-description">
          Welcome to QuizBattle, where curiosity meets competition.
          We make learning engaging, interactive, and rewarding,
          one question at a time.
        </p>

        <button
          className="about-primary-button"
          onClick={() => navigate('/quiz')}
        >
          Explore Quizzes
          <ArrowRight size={19} />
        </button>

        <div className="about-hero-decoration">
          <Brain size={85} strokeWidth={1} />
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <div className="about-section-icon">
          <Lightbulb size={27} />
        </div>

        <div className="about-mission-content">
          <span className="about-eyebrow">OUR MISSION</span>
          <h2>Making learning an exciting journey.</h2>
          <p>
            We believe learning should be more than memorizing facts.
            QuizBattle gives learners a place to challenge themselves,
            discover what they know, identify areas to improve, and
            enjoy the process along the way.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="about-features">
        <div className="about-section-heading">
          <span className="about-eyebrow">WHAT MAKES US DIFFERENT</span>
          <h2>Learn. Play. <span className="about-gradient">Level up.</span></h2>
          <p>
            Everything you need to turn your curiosity into progress.
          </p>
        </div>

        <div className="about-features-grid">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article className="about-feature-card" key={feature.title}>
                <div className={`about-feature-icon ${feature.style}`}>
                  <Icon size={27} />
                </div>

                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="about-value-item">
          <Zap size={23} />
          <div>
            <h3>Keep Growing</h3>
            <p>Every question is an opportunity to learn.</p>
          </div>
        </div>

        <div className="about-value-item">
          <Users size={23} />
          <div>
            <h3>Learn Together</h3>
            <p>Make knowledge sharing part of the journey.</p>
          </div>
        </div>

        <div className="about-value-item">
          <Heart size={23} />
          <div>
            <h3>Enjoy the Process</h3>
            <p>Turn everyday learning into a fun experience.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="about-cta">
        <div className="about-cta-icon">
          <Swords size={30} />
        </div>

        <h2>Ready for your next challenge?</h2>
        <p>
          Put your knowledge to the test and start your QuizBattle journey.
        </p>

        <button
          className="about-primary-button"
          onClick={() => navigate('/quiz')}
        >
          Start Your Quiz
          <ArrowRight size={19} />
        </button>
      </section>
    </div>
  );
};

export default About;
