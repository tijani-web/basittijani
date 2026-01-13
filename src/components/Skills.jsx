import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const labelRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardRefs = useRef([]);

  const skillsData = [
    {
      category: "Core Languages",
      image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg",
      skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "C", "C++"],
      description: "Foundational programming languages and web standards"
    },
    {
      category: "Frontend Engineering",
      image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
      skills: ["React", "Next.js", "Client-side Routing & State Management", "Responsive & Accessible UI Design", "UX Flow Design & User-Centered Interfaces"],
      description: "Modern frontend frameworks and user experience design"
    },
    {
      category: "Backend Engineering",
      image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
      skills: ["Node.js", "Express.js", "REST API Design & Architecture", "Authentication & Authorization Systems", "WebSocket & Real-time Communication"],
      description: "Server-side architecture and API development"
    },
    {
      category: "Databases & Data",
      image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg",
      skills: ["PostgreSQL", "Firebase", "Relational Data Modeling", "API Data Validation & Serialization", "JSON-based Data Contracts"],
      description: "Database management and data architecture"
    },
    {
      category: "Dev Tools & Platforms",
      image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg",
      skills: ["Git & GitHub", "Docker", "Railway", "Vercel", "Environment Configuration & Secrets Management"],
      description: "Development workflow and deployment infrastructure"
    },
    {
      category: "System Architecture",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
      skills: [
        "Distributed Systems Design", 
        "API Gateway & Service Mesh",
        "API-first Design",
        "Load Balancing & Auto-scaling",
        "Database Sharding & Replication"
  ],
  description: "Enterprise-grade system architecture and design patterns"
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
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className='portfolio-skills-section' ref={sectionRef}>
      <div className="portfolio-skill-heading">
        <p className="portfolio-section-label" ref={labelRef}>Technical Stack</p>
        <h1 ref={headingRef}>Engineering Toolkit</h1>
        <p className="portfolio-skill-subtitle" ref={subtitleRef}>
          Technologies and methodologies for building scalable, production-ready systems
        </p>
      </div>
      
      <div className="portfolio-skills-grid">
        {skillsData.map((category, index) => (
          <div 
            key={category.category}
            className="portfolio-skill-card"
            ref={el => cardRefs.current[index] = el}
          >
            <div className="portfolio-skill-img-wrapper">
              <img src={category.image} alt={category.category} />
            </div>
            
            <div className="portfolio-skill-info">
              <h3>{category.category}</h3>
              <div className="portfolio-skill-role">{category.description}</div>
              
              <div className="portfolio-skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="portfolio-skill-item">
                    <div className="portfolio-skill-dot"></div>
                    <span className="portfolio-skill-name">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;