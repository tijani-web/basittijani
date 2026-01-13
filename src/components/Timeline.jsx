import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experienceData } from '../constant';

gsap.registerPlugin(ScrollTrigger);

const Timeline = () => {
  const timelineRef = useRef(null);
  const lineRef = useRef(null);
  const lineFillRef = useRef(null);
  const imageRefs = useRef([]);
  const contentRefs = useRef([]);
  const sectionTitleRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(Array(experienceData.length).fill(false));

  useEffect(() => {
    imageRefs.current = imageRefs.current.slice(0, experienceData.length);
    contentRefs.current = contentRefs.current.slice(0, experienceData.length);
  }, []);

  // Handle image loading for skeleton
  const handleImageLoad = (index) => {
    setImagesLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  useEffect(() => {
    // Initial setup
    gsap.set(lineFillRef.current, { scaleY: 0, transformOrigin: "top center" });
    gsap.set(imageRefs.current, { x: -50, opacity: 0 });
    gsap.set(contentRefs.current, { x: 50, opacity: 0 });
    gsap.set(sectionTitleRef.current, { y: 30, opacity: 0 });

    // Section title animation
    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionTitleRef.current,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
    titleTl.to(sectionTitleRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    });

    // Line fill animation
    ScrollTrigger.create({
      trigger: timelineRef.current,
      start: "top 30%",
      end: "bottom 70%",
      onUpdate: (self) => {
        gsap.to(lineFillRef.current, {
          scaleY: self.progress,
          duration: 0.3,
          ease: "power1.out"
        });
      }
    });

    // Project animations
    experienceData.forEach((project, i) => {
      const image = imageRefs.current[i];
      const content = contentRefs.current[i];

      ScrollTrigger.create({
        trigger: image,
        start: "top 80%",
        onEnter: () => {
          gsap.to(image, {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out"
          });
          gsap.to(content, {
            x: 0,
            opacity: 1,
            duration: 0.7,
            delay: 0.1,
            ease: "power2.out"
          });
        }
      });
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section className="projects-section" id="projects">
      <div className="section-header">
        <span className="section-label-timeline">Build Log</span>
        <h2 ref={sectionTitleRef}>Engineered Systems</h2>
      </div>
      
      <div className="timeline-container" ref={timelineRef}>
        <div className="timeline-line" ref={lineRef}>
          <div className="timeline-line-fill" ref={lineFillRef} />
        </div>

        {experienceData.map((project, i) => (
          <div key={`project-${i}`} className={`project-card ${i % 2 === 0 ? 'left' : 'right'}`}>
            {/* Project Image with Skeleton */}
            <div 
              className="project-image-wrapper"
              ref={el => imageRefs.current[i] = el}
            >
              {!imagesLoaded[i] && (
                <div className="image-skeleton">
                  <div className="skeleton-shimmer"></div>
                </div>
              )}
              <img 
                src={project.imgPath} 
                alt={project.projectName} 
                className={`project-image ${imagesLoaded[i] ? 'loaded' : 'loading'}`}
                onLoad={() => handleImageLoad(i)}
                loading="lazy"
              />
            </div>

            {/* Project Content */}
            <div 
              className="project-content"
              ref={el => contentRefs.current[i] = el}
            >
              <div className="project-header">
                <div className="project-tags">
                  <span className="project-year">{project.date}</span>
                  {project.status && (
                    <span className="project-status">{project.status}</span>
                  )}
                </div>
                <h3 className="project-title">
                  {project.projectName}
                  <span className="project-role">{project.title}</span>
                </h3>
              </div>

              <ul className="project-features">
                {project.responsibilities.map((item, j) => (
                  <li key={`feature-${i}-${j}`} className="feature-item">
                    <span className="feature-bullet"></span>
                    <span className="feature-text">{item}</span>
                  </li>
                ))}
              </ul>

              {project.liveLink && (
                <a 
                  href={project.liveLink} 
                  className="project-link"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <span>View Live Project</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </a>
              )}
            </div>

            {/* Timeline Node */}
            <div className="timeline-node"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;