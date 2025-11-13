import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

const ResumePreview = ({ resumeData, onDownload }) => {
  if (!resumeData) {
    return (
      <div className="resume-preview">
        <div className="no-resume">
          <h3>No Resume Created</h3>
          <p>Please build your resume first to see the preview.</p>
        </div>
      </div>
    );
  }

  const { personalInfo, summary, experience, education, skills } = resumeData;

  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    } else {
      // Basic download functionality
      const dataStr = JSON.stringify(resumeData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${personalInfo.firstName}-${personalInfo.lastName}-resume.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="resume-preview"
    >
      <div className="preview-header">
        <h2>Resume Preview</h2>
        <button onClick={handleDownload} className="btn-primary">
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>

      <div className="resume-document">
        {/* Header */}
        <header className="resume-header">
          <h1>{personalInfo.firstName} {personalInfo.lastName}</h1>
          <div className="contact-info">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.location && <span>• {personalInfo.location}</span>}
            {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
            {personalInfo.portfolio && <span>• {personalInfo.portfolio}</span>}
          </div>
        </header>

        {/* Summary */}
        {summary && (
          <section className="resume-section">
            <h2>Professional Summary</h2>
            <p>{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="resume-section">
            <h2>Work Experience</h2>
            {experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <div className="experience-header">
                  <div>
                    <h3>{exp.position}</h3>
                    <span className="company">{exp.company}</span>
                  </div>
                  <span className="date">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <div className="experience-description">
                    <p>{exp.description}</p>
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section className="resume-section">
            <h2>Education</h2>
            {education.map((edu, index) => (
              <div key={index} className="education-item">
                <div className="education-header">
                  <div>
                    <h3>{edu.degree} in {edu.field}</h3>
                    <span className="institution">{edu.institution}</span>
                  </div>
                  <span className="date">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                {edu.gpa && (
                  <div className="education-details">
                    <p>GPA: {edu.gpa}</p>
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className="resume-section">
            <h2>Skills</h2>
            <div className="skills-list">
              {skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </motion.div>
  );
};

export default ResumePreview;