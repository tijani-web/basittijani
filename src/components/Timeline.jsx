import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experienceData } from '../constant';

gsap.registerPlugin(ScrollTrigger);

const Timeline = () => {
  const timelineRef = useRef(null);
  const lineRef = useRef(null);
  const lineFillRef = useRef(null);
  const logoRefs = useRef([]);
  const imageRefs = useRef([]);
  const contentRefs = useRef([]);
  const sectionTitleRef = useRef(null);

  useEffect(() => {
    imageRefs.current = imageRefs.current.slice(0, experienceData.length);
    contentRefs.current = contentRefs.current.slice(0, experienceData.length);
  }, []);

  useEffect(() => {
    // Initial setup
    gsap.set(lineFillRef.current, { scaleY: 0, transformOrigin: "top center" });
    gsap.set(imageRefs.current, { x: -50, opacity: 0 });
    gsap.set(contentRefs.current, { x: 50, opacity: 0 });
    gsap.set(sectionTitleRef.current, { y: 50, opacity: 0 });

    // Section title animation - LIKE OVERVIEW
    gsap.to(sectionTitleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionTitleRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Line fill animation
    const fillTl = gsap.timeline({
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1
      }
    });
    fillTl.to(lineFillRef.current, { scaleY: 1, ease: "none" });

    // Project animations
    experienceData.forEach((project, i) => {
      const image = imageRefs.current[i];
      const content = contentRefs.current[i];

      // Content animations
      gsap.to(image, {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: image,
          start: "top 75%",
          end: "top 10%",
          scrub: 1
        }
      });

      gsap.to(content, {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: content,
          start: "top 75%",
          end: "top 30%",
          scrub: 1
        }
      });

      // Line color change
      ScrollTrigger.create({
        trigger: image,
        start: "top center",
        end: "bottom center",
        onEnter: () => updateLineColor(i),
        onEnterBack: () => updateLineColor(i)
      });
    });

    function updateLineColor(index) {
      const colors = ["#00e0ff", "#0099cc", "#0077aa", "#005588", "#003366"];
      gsap.to(lineFillRef.current, {
        backgroundColor: colors[index % colors.length],
        duration: 0.5
      });
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section className="portfolio-timeline-section">
      <h2 className="portfolio-section-title" ref={sectionTitleRef}>My Journey</h2>
      
      <div className="portfolio-timeline-container" ref={timelineRef}>
        <div className="portfolio-timeline-line" ref={lineRef}>
          <div className="portfolio-timeline-line-fill" ref={lineFillRef} />
        </div>

        {experienceData.map((project, i) => (
          <div key={`project-${i}`} className="portfolio-project-container">
            <div 
              className="portfolio-project-image-container"
              ref={el => imageRefs.current[i] = el}
            >
              <img 
                src={project.imgPath} 
                alt={project.projectName} 
                className="portfolio-project-image"
              />
            </div>

            <div 
              className="portfolio-project-content"
              ref={el => contentRefs.current[i] = el}
            >
              <h3 className="portfolio-project-name">{project.projectName}</h3>
              <div className="portfolio-project-meta">
                <span className="portfolio-project-title">{project.title}</span>
                <span className="portfolio-project-date">{project.date}</span>
              </div>
              <ul className="portfolio-responsibilities">
                {project.responsibilities.map((item, j) => (
                  <li key={`responsibility-${i}-${j}`} className="portfolio-responsibility-item">
                    {item}
                  </li>
                ))}
              </ul>
              <a href={project.liveLink} className="portfolio-btn primary-btn" target="_blank" rel="noopener noreferrer" style={{ marginTop: "8px" }}>
                View Live
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;