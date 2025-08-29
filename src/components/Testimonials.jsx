import React, { useEffect, useRef } from "react";
import { testimonials } from "../constant/Testimonials";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Testimonial.css'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const labelRef = useRef(null);
  const underlineRef = useRef(null);
  const topCardsRef = useRef([]);
  const bottomCardsRef = useRef([]);

  useEffect(() => {
    let topScroll = 0;
    let bottomScroll = 0;

    const animate = () => {
      // top row → left
      if (topRef.current) {
        topScroll += 0.6; // faster
        if (topScroll >= topRef.current.scrollWidth / 2) topScroll = 0;
        topRef.current.scrollLeft = topScroll;
      }

      // bottom row → right
      if (bottomRef.current) {
        bottomScroll -= 0.55; // faster, opposite direction
        if (Math.abs(bottomScroll) >= bottomRef.current.scrollWidth / 2) {
          bottomScroll = 0;
        }
        bottomRef.current.scrollLeft = bottomRef.current.scrollWidth / 2 + bottomScroll;
      }

      requestAnimationFrame(animate);
    };

    animate();

    // GSAP animations for section entrance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    tl.fromTo(labelRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 40, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "elastic.out(1, 0.5)" },
      "-=0.3"
    )
    .fromTo(underlineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(descriptionRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    );

    // Animate all cards at the same time without stagger
    gsap.fromTo([...topCardsRef.current, ...bottomCardsRef.current],
      { opacity: 0, y: 50, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="portfolio-testimonials-wrapper" ref={sectionRef}>
      <div className="portfolio-testimonial-header" ref={headerRef}>
        <p className="portfolio-section-label" ref={labelRef}>Client & Peer Feedback</p>
        <h1 ref={titleRef}>Voices of Trust</h1>
        <div className="portfolio-header-underline" ref={underlineRef}></div>
        <p className="portfolio-testimonial-description" ref={descriptionRef}>
          Peers and mentors have shared motivating words that highlight my progress, 
          creativity, and dedication to growth.
        </p>
      </div>
      
      {/* Fade overlays */}
      <div className="portfolio-fade-left"></div>
      <div className="portfolio-fade-right"></div>

      {/* Top row */}
      <div className="portfolio-testimonials-row" ref={topRef}>
        {[...testimonials, ...testimonials].map((item, idx) => (
          <div 
            key={`top-${idx}`} 
            className="portfolio-testimonial-card"
            ref={el => topCardsRef.current[idx] = el}
          >
            <p className="portfolio-testimonial-feedback">"{item.feedback}"</p>
            <div className="portfolio-testimonial-author">
              <h3>@{item.name}</h3>
              {item.role && <span className="portfolio-testimonial-role">{item.role}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div className="portfolio-testimonials-row" ref={bottomRef}>
        {[...testimonials, ...testimonials].map((item, idx) => (
          <div 
            key={`bottom-${idx}`} 
            className="portfolio-testimonial-card"
            ref={el => bottomCardsRef.current[idx] = el}
          >
            <p className="portfolio-testimonial-feedback">"{item.feedback}"</p>
            <div className="portfolio-testimonial-author">
              <h3>@{item.name}</h3>
              {item.role && <span className="portfolio-testimonial-role">{item.role}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;