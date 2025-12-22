import React, { useState } from "react";
import "./Resume.css";

const Resume = () => {
  const [open, setOpen] = useState(false);

  return (
    <section id="resume" className="resume">
      <div className="resume-container">
        <h2 className="resume-title">Resume</h2>

        {/* Resume Card */}
        <div className="resume-card" onClick={() => setOpen(true)}>
          <div className="resume-icon">
            📄
          </div>
          <div className="resume-card-content">
            <h3>View Resume</h3>
            <p>Preview my resume directly in the browser</p>
          </div>
        </div>

        {/* Download Button */}
        <a href="/resume.pdf" download className="resume-download-btn">
          <span>Download Resume</span>
          <span className="download-icon">⬇</span>
        </a>
      </div>

      {/* Modal */}
      {open && (
        <div className="resume-modal" onClick={() => setOpen(false)}>
          <div
            className="resume-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="resume-close"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            <iframe
              src="/resume.pdf"
              title="Resume Preview"
              className="resume-iframe"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Resume;
