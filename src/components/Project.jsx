import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../constant/projects';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const projectsRef = useRef([]);

  // Responsive items per page
  useEffect(() => {
    const updateItems = () => {
      if (window.innerWidth < 768) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
    };
    
    updateItems();
    window.addEventListener('resize', updateItems);
    return () => window.removeEventListener('resize', updateItems);
  }, []);

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProjects = projects.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber) => {
    if (isAnimating || pageNumber < 1 || pageNumber > totalPages) return;
    
    setIsAnimating(true);
    
    // Animate out
    gsap.to(projectsRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.in",
      onComplete: () => {
        setCurrentPage(pageNumber);
      }
    });
  };

  // Animate in when page changes
  useEffect(() => {
    if (currentProjects.length > 0) {
      projectsRef.current = projectsRef.current.slice(0, currentProjects.length);
      
      gsap.fromTo(projectsRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.1,
          onComplete: () => setIsAnimating(false)
        }
      );
    }
  }, [currentProjects]);

  // Initial animations
  useEffect(() => {
    // Title animation
    gsap.from('.portfolio-section-name', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: '.portfolio-section-name',
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div className="portfolio-projects-container" ref={containerRef}>
      <h1 className="portfolio-section-name">My Projects</h1>
      
      <div className="portfolio-grid-layout">
        {currentProjects.map((project, index) => (
          <div 
            key={index} 
            className="portfolio-item-card"
            ref={el => projectsRef.current[index] = el}
          >
            <div className="portfolio-img-wrapper">
              <div className="portfolio-item-image">
                <img 
                  src={project.imgPath} 
                  alt={project.projectName}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x250/0a0a0f/00e0ff?text=Project+Preview";
                  }}
                />
                <div className="image-overlay"></div>
                {project.liveLink ? (
                  <span className="project-status live">Live</span>
                ) : (
                  <span className="project-status dev">In Development</span>
                )}
              </div>
            </div>
            
            <div className="portfolio-item-content">
              <h3 className="portfolio-item-title">{project.projectName}</h3>
              
              <div className="portfolio-item-desc">
                {project.description.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              
              <div className="portfolio-tech-list">
                {project.tech.slice(0, 4).map((tech, i) => (
                  <span key={i} className="portfolio-tech-tag">{tech}</span>
                ))}
                {project.tech.length > 4 && (
                  <span className="tech-more">+{project.tech.length - 4}</span>
                )}
              </div>
              
              <div className="portfolio-action-buttons">
                {project.liveLink && (
                  <a 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="portfolio-btn primary-btn"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
                <a 
                  href={project.codeLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="portfolio-btn secondary-btn"
                >
                  <FaGithub /> View Code
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="portfolio-pagination-nav">
        <button 
          className="paginate-control prev-btn"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1 || isAnimating}
        >
          <FaArrowLeft /> Previous
        </button>
        
        <div className="page-indicators">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={`paginate-number ${currentPage === page ? 'active-page' : ''}`}
              onClick={() => paginate(page)}
              disabled={isAnimating}
              aria-label={`Go to page ${page}`}
            >
              {page}
            </button>
          ))}
        </div>
        
        <button 
          className="paginate-control next-btn"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages || isAnimating}
        >
          Next <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Projects;