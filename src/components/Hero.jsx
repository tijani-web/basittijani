import React from 'react';
import LightRays from './LightRays';
import SplitText from './SplitText';
import { FaGithub } from 'react-icons/fa';
import Header from './Header';
import { NavLink } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero-section">
      {/* Background Layer */}
      <LightRays
        raysOrigin="top"
        raysColor="#ffffff"
        raysSpeed={2}
        lightSpread={1}
        rayLength={4}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.05}
        className="custom-rays"
      />

      {/* Overlay Content */}
      <div className="hero-content">
        <Header/>
        <div className="hero-text">
            <div className="hero-heading">
                <SplitText
                  text={`let mission = "code that lasts beyond trends";`}
                  className="hero-header"
                  delay={100}
                  duration={0.4}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="center"
                />
            </div>
            <div className="buttons">
              <NavLink to={'/projects'} className="btn primary">View My Projects</NavLink>
              <a href="https://github.com/tijani-web" target="_blank" className="btn secondary">GitHub <FaGithub size={20}/> </a>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
