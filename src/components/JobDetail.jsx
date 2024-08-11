import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const JobDetail = ({ jobId, isOpen, onClose }) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && jobId) {
      setLoading(true);
      axios.get(`https://dev-example.sanbercloud.com/api/job-vacancy/${jobId}`)
        .then(response => {
          setJob(response.data);
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to fetch job details');
          setLoading(false);
        });
    }
  }, [isOpen, jobId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative p-8 border w-11/12 md:w-5/6 lg:w-4/5 xl:w-3/4 shadow-lg rounded-lg bg-white max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {job && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <img 
                src={job.company_image_url} 
                alt={job.company_name} 
                className="w-full h-auto mb-4 rounded-lg"
              />
            </div>
            
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
              <p className="mb-2"><strong>Company:</strong> {job.company_name}</p>
              <p className="mb-2"><strong>Location:</strong> {job.company_city}</p>
              <p className="mb-2"><strong>Job Type:</strong> {job.job_type}</p>
              <p className="mb-2"><strong>Tenure:</strong> {job.job_tenure}</p>
              <p className="mb-2"><strong>Salary:</strong> Rp {job.salary_min.toLocaleString()} - Rp {job.salary_max.toLocaleString()}</p>
              <p className="mb-2"><strong>Status:</strong> {job.job_status ? 'Open' : 'Closed'}</p>
              <h4 className="text-xl font-semibold mb-2">Job Description:</h4>
              <p className="mb-4">{job.job_description}</p>
              <h4 className="text-xl font-semibold mb-2">Qualifications:</h4>
              <p>{job.job_qualification}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

JobDetail.propTypes = {
  jobId: PropTypes.number,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};