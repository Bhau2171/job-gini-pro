import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ResumeForm from '../components/resume/ResumeForm';
import ResumePreview from '../components/resume/ResumePreview';
import { resumeAPI } from '../utils/auth';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Save, Download } from 'lucide-react';

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('form');

  useEffect(() => {
    loadResume();
  }, []);

  const loadResume = async () => {
    try {
      const response = await resumeAPI.getResume();
      if (response.resumeData) {
        setResumeData(response.resumeData);
      }
    } catch (error) {
      console.error('Error loading resume:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveResume = async (data) => {
    setSaving(true);
    try {
      await resumeAPI.saveResume(data);
      setResumeData(data);
      // Show success message
      alert('Resume saved successfully!');
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Failed to save resume. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = () => {
    // Basic download functionality - in a real app, you'd generate a PDF
    const dataStr = JSON.stringify(resumeData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading your resume..." />
      </div>
    );
  }

  return (
    <div className="resume-builder">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-header"
        >
          <h1>Resume Builder</h1>
          <p>Create and customize your professional resume</p>
        </motion.div>

        <div className="resume-tabs">
          <button
            className={`tab-button ${activeTab === 'form' ? 'active' : ''}`}
            onClick={() => setActiveTab('form')}
          >
            Build Resume
          </button>
          <button
            className={`tab-button ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
            disabled={!resumeData}
          >
            Preview
          </button>
        </div>

        <div className="resume-content">
          {activeTab === 'form' ? (
            <ResumeForm
              resumeData={resumeData}
              onSave={handleSaveResume}
            />
          ) : (
            <ResumePreview resumeData={resumeData} />
          )}
        </div>

        {resumeData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="resume-actions"
          >
            <button
              onClick={handleDownload}
              className="btn-secondary"
              disabled={saving}
            >
              <Download className="w-4 h-4" />
              Download JSON
            </button>
            {saving && (
              <div className="saving-indicator">
                <LoadingSpinner size="small" text="Saving..." />
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder;