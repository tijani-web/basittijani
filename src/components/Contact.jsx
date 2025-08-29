import React, { useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaPaperPlane, FaInstagram } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { FaXTwitter } from "react-icons/fa6";

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_gnt9k1q", // Service ID
        "template_uaj3bbl", // Template ID
        form.current,
        "yf-y1AAmM3yhDLbLe" // Public Key
      )
      .then(() => {
        toast.success("✅ Message sent successfully!", {
          position: "bottom-right",
          autoClose: 3000,
        });
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => {
        toast.error("❌ Failed to send message. Try again!", {
          position: "bottom-right",
          autoClose: 3000,
        });
      });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <h2 className="contact-title">Got a Project in Mind?</h2>
        <p className="section-description">
          I'm always open to discussing new opportunities and interesting
          projects. Let's create something amazing together!
        </p>

        <div className="contact-content">
          <form ref={form} className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="5"
                required
                className="form-input"
              ></textarea>
            </div>

            <button type="submit" className="submit-btn btn primary">
              Send Message <FaPaperPlane className="btn-icon" />
            </button>
          </form>

          <div className="social-links">
            <h3>Or find me on</h3>
            <div className="social-icons">
              <a href="https://github.com/tijani-web" target="_blank" className="social-link">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/basit-tijani-4362b3320/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BDwxG1JF3Q9GPLZQvHefV8w%3D%3D" target="_blank" className="social-link">
                <FaLinkedin />
              </a>
              <a href="https://x.com/tijani_web" className="social-link" target='_blank' rel="noopener noreferrer" aria-label="Twitter">
                <FaXTwitter />
              </a>
              <a href="https://www.instagram.com/tijanidev?igsh=MWVpczc4eTBpM2xlYQ==" target="_blank" className="social-link">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
