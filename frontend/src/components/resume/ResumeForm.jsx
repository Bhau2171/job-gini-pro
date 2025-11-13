import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Save } from 'lucide-react';

const ResumeForm = ({ resumeData, onSave }) => {
  const [formData, setFormData] = useState(resumeData || {
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: []
  });

  const handlePersonalInfoChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now(),
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          current: false,
          description: ''
        }
      ]
    }));
  };

  const updateExperience = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now(),
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          gpa: ''
        }
      ]
    }));
  };

  const updateEducation = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const handleSkillsChange = (skillsString) => {
    const skillsArray = skillsString.split(',').map(skill => skill.trim()).filter(skill => skill);
    setFormData(prev => ({
      ...prev,
      skills: skillsArray
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="resume-form"
    >
      <div className="form-header">
        <h2>Build Your Resume</h2>
        <button onClick={handleSave} className="btn-primary">
          <Save className="w-4 h-4" />
          Save Resume
        </button>
      </div>

      <div className="form-sections">
        {/* Personal Information */}
        <section className="form-section">
          <h3>Personal Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                value={formData.personalInfo.firstName}
                onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                value={formData.personalInfo.lastName}
                onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.personalInfo.email}
                onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                value={formData.personalInfo.phone}
                onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
              />
            </div>
            <div className="form-group col-span-2">
              <label>Location</label>
              <input
                type="text"
                value={formData.personalInfo.location}
                onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>LinkedIn</label>
              <input
                type="url"
                value={formData.personalInfo.linkedin}
                onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Portfolio</label>
              <input
                type="url"
                value={formData.personalInfo.portfolio}
                onChange={(e) => handlePersonalInfoChange('portfolio', e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Professional Summary */}
        <section className="form-section">
          <h3>Professional Summary</h3>
          <div className="form-group">
            <textarea
              value={formData.summary}
              onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
              rows={4}
              placeholder="Brief overview of your professional background and career objectives..."
            />
          </div>
        </section>

        {/* Work Experience */}
        <section className="form-section">
          <div className="section-header">
            <h3>Work Experience</h3>
            <button onClick={addExperience} className="btn-secondary">
              <Plus className="w-4 h-4" />
              Add Experience
            </button>
          </div>
          {formData.experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="experience-item"
            >
              <div className="item-header">
                <h4>Experience #{index + 1}</h4>
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="delete-btn"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Position</label>
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    disabled={exp.current}
                  />
                </div>
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                    />
                    Current Position
                  </label>
                </div>
                <div className="form-group col-span-2">
                  <label>Description</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    rows={3}
                    placeholder="Describe your responsibilities and achievements..."
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Education */}
        <section className="form-section">
          <div className="section-header">
            <h3>Education</h3>
            <button onClick={addEducation} className="btn-secondary">
              <Plus className="w-4 h-4" />
              Add Education
            </button>
          </div>
          {formData.education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="education-item"
            >
              <div className="item-header">
                <h4>Education #{index + 1}</h4>
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="delete-btn"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>Institution</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Degree</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Field of Study</label>
                  <input
                    type="text"
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>GPA</label>
                  <input
                    type="text"
                    value={edu.gpa}
                    onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                    placeholder="4.0"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Skills */}
        <section className="form-section">
          <h3>Skills</h3>
          <div className="form-group">
            <label>Enter skills separated by commas</label>
            <input
              type="text"
              value={formData.skills.join(', ')}
              onChange={(e) => handleSkillsChange(e.target.value)}
              placeholder="JavaScript, React, Node.js, Python, ..."
            />
          </div>
          <div className="skills-preview">
            {formData.skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default ResumeForm;