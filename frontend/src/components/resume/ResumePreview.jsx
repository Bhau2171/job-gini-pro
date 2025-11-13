import React from 'react';
import { motion } from 'framer-motion';

const ResumePreview = ({ resumeData }) => {
  if (!resumeData) {
    return (
      <div className="resume-preview">
        <p>No resume data available. Please build your resume first.</p>
      </div>
    );
  }

  const { personalInfo, summary, experience, education, skills } = resumeData;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="resume-preview"
    >
      <div className="resume-document">
        {/* Header */}
        <header className="resume-header">
          <h1>{personalInfo.firstName} {personalInfo.lastName}</h1>
          <div className="contact-info">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
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
                  <h3>{exp.position}</h3>
                  <span className="company">{exp.company}</span>
                  <span className="date">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.description && <p>{exp.description}</p>}
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
                  <h3>{edu.degree} in {edu.field}</h3>
                  <span className="institution">{edu.institution}</span>
                  <span className="date">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                {edu.gpa && <p>GPA: {edu.gpa}</p>}
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