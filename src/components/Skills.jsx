import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const labelRef = useRef(null);
  const subtitleRef = useRef(null);
  const gridContainerRef = useRef(null);
  const cardRefs = useRef([]);

  const items = [
    {
      image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg",
      title: "HTML5",
      subtitle: "Markup Language",
      handle: "@html5",
      borderColor: "#E34F26",
      gradient: "linear-gradient(145deg, #E34F26, #111)",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTML"
    },
    {
      image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg",
      title: "CSS3",
      subtitle: "Styling Language",
      handle: "@css",
      borderColor: "#264de4",
      gradient: "linear-gradient(145deg, #264de4, #111)",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS"
    },
    {
      image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
      title: "JavaScript",
      subtitle: "Programming Language",
      handle: "@javascript",
      borderColor: "#F7DF1E",
      gradient: "linear-gradient(145deg, #F7DF1E, #111)",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
    },
    {
      image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
      title: "React",
      subtitle: "Frontend Library",
      handle: "@react",
      borderColor: "#61DBFB",
      gradient: "linear-gradient(145deg, #61DBFB, #111)",
      url: "https://reactjs.org/"
    },
    {
      image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg",
      title: "C",
      subtitle: "Programming Language",
      handle: "@c",
      borderColor: "#00599C",
      gradient: "linear-gradient(145deg, #00599C, #111)",
      url: "https://cplusplus.com/"
    },
    {
      image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg",
      title: "C++",
      subtitle: "Programming Language",
      handle: "@cplusplus",
      borderColor: "#00599C",
      gradient: "linear-gradient(145deg, #00599C, #111)",
      url: "https://cplusplus.com/"
    },
    {
      image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg",
      title: "Firebase",
      subtitle: "Auth & Firestore",
      handle: "@firebase",
      borderColor: "#FFCA28",
      gradient: "linear-gradient(145deg, #FFCA28, #111)",
      url: "https://firebase.google.com/"
    },
    {
      image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/json/json-original.svg",
      title: "JSON",
      subtitle: "Data Format",
      handle: "@json",
      borderColor: "#FF6B6B",
      gradient: "linear-gradient(145deg, #FF6B6B, #111)",
      url: "https://www.json.org/json-en.html"
    },
    {
      image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg",
      title: "GitHub",
      subtitle: "Version Control",
      handle: "@github",
      borderColor: "#181717",
      gradient: "linear-gradient(145deg, #181717, #111)",
      url: "https://github.com/yourusername"
    }
  ];

  useEffect(() => {
    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Animate elements in sequence
    tl.fromTo(labelRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(headingRef.current,
      { opacity: 0, y: 40, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "elastic.out(1, 0.5)" },
      "-=0.3"
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

    // Animate cards individually
    cardRefs.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    });

    return () => {
      // Clean up scroll triggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className='portfolio-skills-section' ref={sectionRef}>
      <div className="portfolio-skill-heading">
        <p className="portfolio-section-label" ref={labelRef}>Technical Expertise</p>
        <h1 ref={headingRef}>My Development Toolbox</h1>
        <p className="portfolio-skill-subtitle" ref={subtitleRef}>
          Technologies, languages, and platforms I use to turn ideas into functional, user-friendly applications.
        </p>
      </div>
      
      <div className="portfolio-skills-grid" ref={gridContainerRef}>
        {items.map((item, index) => (
          <div 
            key={index}
            className="portfolio-skill-card"
            ref={el => cardRefs.current[index] = el}
            style={{ '--card-gradient': item.gradient, '--border-color': item.borderColor }}
          >
            <div className="portfolio-skill-img-wrapper">
              <img src={item.image} alt={item.title} />
            </div>
            
            <div className="portfolio-skill-info">
              <h3>{item.title}</h3>
              <div className="portfolio-skill-role">{item.subtitle}</div>
              <div className="portfolio-skill-handle">{item.handle}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;