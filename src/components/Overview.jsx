import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Overview = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const labelRefs = useRef([]);
  const paragraphRefs = useRef([]);
  const taglineRef = useRef(null);

  useEffect(() => {
    // Animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Animate elements in sequence
    tl.fromTo(headingRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
    )
    .fromTo(labelRefs.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power1.out" }
    )
    .fromTo(paragraphRefs.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power1.out" }
    )
    .fromTo(taglineRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" }
    );

    return () => {
      // Clean up scroll triggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Add refs to our elements
  const addToLabelRefs = (el) => {
    if (el && !labelRefs.current.includes(el)) {
      labelRefs.current.push(el);
    }
  };

  const addToParagraphRefs = (el) => {
    if (el && !paragraphRefs.current.includes(el)) {
      paragraphRefs.current.push(el);
    }
  };

  return (
    <div className='overview' ref={sectionRef} id='about'>
      <p className="section-label" ref={addToLabelRefs}>Introduction</p>
      <h1 ref={headingRef}>Overview.</h1>
      
      <div className="about">
        <p ref={addToParagraphRefs}>
          I'm <strong>Basit Tijani</strong>, a Software Engineering student at 
          <strong> Aptech Institution</strong>, passionate about creating clean, 
          responsive, and user-focused applications. 
        </p>

        <p className='section-label' ref={addToLabelRefs}>Technical Skills</p>
        <p ref={addToParagraphRefs}>
          I currently work with <strong>React, JavaScript, C/C++, and REST APIs</strong>, 
          while continuously expanding my knowledge in other technologies. My focus is on 
          building projects that balance performance, usability, and design.
        </p>

        <p className='section-label' ref={addToLabelRefs}>Project</p>
        <p ref={addToParagraphRefs}>
          I'm the creator of <strong>StackProof</strong>, a developer challenge platform that 
          helps programmers sharpen their skills through practical, real-world tasks.
        </p>

        <p className='section-label' ref={addToLabelRefs}>Mindset</p>
        <p ref={addToParagraphRefs}> 
          I value solitude for deep problem-solving, yet thrive on collaboration when it 
          drives meaningful results.
        </p>

        <p className="tagline" ref={taglineRef}>
          Always learning. Always building.
        </p>
      </div>
    </div>
  );
};

export default Overview;