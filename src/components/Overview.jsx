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
      I'm <strong>Basit Tijani</strong>, a software engineer building 
      <em> scalable, user-centric systems</em> with clean architecture and intuitive UX.
    </p>

    
    <p className='section-label' ref={addToLabelRefs}>Technical Stack</p>
    <p ref={addToParagraphRefs}>
      Working with <strong>JavaScript/TypeScript, C, C++, React, Next.js, Node.js, PostgreSQL</strong>, 
      and modern DevOps to <em>architect and engineer production-grade systems</em> 
      from complex technical requirements.
    </p>

    <p className='section-label' ref={addToLabelRefs}>Selected Work</p>
    <p ref={addToParagraphRefs}>
      Built and scaled applications like 
      <strong> Nexora</strong> (AI knowledge platform), 
      <strong> FluxAPI</strong> (web API builder), and 
      <strong> FlowPitch</strong> (collaborative roadmapping) — 
      each designed for <em>real-world scalability and user adoption</em>.
    </p>

    <p className='section-label' ref={addToLabelRefs}>Approach</p>
    <p ref={addToParagraphRefs}> 
      I prioritize for <em>clear system design, intuitive user flows, and long-term maintainability.</em>. 
      Focused on <strong>alignment, execution, and sustainable solutions</strong> 
      whether working independently or collaborating.
    </p>

    <p className="tagline" ref={taglineRef}>
      I build systems people actually use.
    </p>
  </div>
</div>
);

};

export default Overview;