import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { gsap } from 'gsap'

const Header = () => {
  const navRef = useRef(null)
  const logoRef = useRef(null)
  const linksRef = useRef([])
  const hamburgerRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    // Create navbar animation timeline
    const tl = gsap.timeline({ delay: 0.5 })
    
    // Animate navbar entrance
    tl.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(logoRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.3"
    )
    .fromTo(linksRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      "-=0.2"
    )
    .fromTo(hamburgerRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
      "-=0.2"
    )

    return () => {
      tl.kill()
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <nav className="glass-nav" ref={navRef}>
        <div className="logo" ref={logoRef}>
          <NavLink to="/" onClick={closeMenu}>
            <img src="/basit_logo_white.png" alt="Basit Logo" />
          </NavLink>
        </div>
        
        <div className={`nav-links ${isMenuOpen ? 'nav-links-active' : ''}`}>
          <a 
            href="/#about" 
            ref={el => linksRef.current[0] = el}
            className="nav-link"
            onClick={closeMenu}
          >
            About
          </a>
          <NavLink 
            to="/projects" 
            ref={el => linksRef.current[1] = el}
            className="nav-link"
            onClick={closeMenu}
          >
            Projects
          </NavLink>
          <a 
            href="/#contact" 
            ref={el => linksRef.current[2] = el}
            className="nav-link"
            onClick={closeMenu}
          >
            Contact
          </a>
        </div>

        <div 
          className={`hamburger ${isMenuOpen ? 'hamburger-active' : ''}`} 
          ref={hamburgerRef}
          onClick={toggleMenu}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMenu}></div>
      )}
    </>
  )
}

export default Header