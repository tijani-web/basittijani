import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../constant/projects';
import { FaGithub } from 'react-icons/fa';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsRef = useRef([]);
  const itemsPerPage = { desktop: 3, tablet: 2, mobile: 3 };

  // Calculate items per page based on screen size
  const getItemsPerPage = () => {
    if (typeof window === 'undefined') return itemsPerPage.desktop;
    if (window.innerWidth < 768) return itemsPerPage.mobile;
    if (window.innerWidth < 1024) return itemsPerPage.tablet;
    return itemsPerPage.desktop;
  };

  const [itemsPerPageState, setItemsPerPageState] = useState(getItemsPerPage());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPageState(getItemsPerPage());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(projects.length / itemsPerPageState);

  // Get current projects
  const indexOfLastProject = currentPage * itemsPerPageState;
  const indexOfFirstProject = indexOfLastProject - itemsPerPageState;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  // Handle page change
  const paginate = (pageNumber) => {
    // Animate out current projects
    gsap.to(projectsRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      stagger: 0.1,
      onComplete: () => {
        setCurrentPage(pageNumber);
      }
    });
  };

  // Animate in projects when page changes or on initial load
  useEffect(() => {
    if (projectsRef.current.length > 0) {
      gsap.to(projectsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
      });
    }
  }, [currentPage, currentProjects]);

  // Set up scroll animations
  useEffect(() => {
    projectsRef.current.forEach((ref, i) => {
      if (ref) {
        gsap.fromTo(ref,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: ref,
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
  }, [currentProjects]);

  return (
    <div className="portfolio-projects-container">
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
                <img src={project.imgPath} alt={project.projectName} />
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
                {project.tech.map((tech, i) => (
                  <span key={i} className="portfolio-tech-tag">{tech}</span>
                ))}
              </div>
              
              <div className="portfolio-action-buttons">
                <a 
                  href={project.liveLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="portfolio-btn primary-btn"
                >
                  Live
                </a>
                <a style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
                  href={project.codeLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="portfolio-btn secondary-btn"
                >
                  Code
                  <FaGithub size={16}/>
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
          disabled={currentPage === 1}
        >
          Prev
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            className={`paginate-number ${currentPage === page ? 'active-page' : ''}`}
            onClick={() => paginate(page)}
          >
            {page}
          </button>
        ))}
        
        <button 
          className="paginate-control next-btn"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Projects;