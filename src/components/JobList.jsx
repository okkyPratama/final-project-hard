import  { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Card } from './Card';
import { JobDetail } from './JobDetail';
import PropTypes from 'prop-types';

export const JobList = ({ searchTerm = '' }) => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    city: '',
    company: '',
    minSalary: '',
  });

  const fetchJobs = useCallback(async () => {
    try {
      const response = await axios.get('https://dev-example.sanbercloud.com/api/job-vacancy');
      setJobs(response.data.data);
      setFilteredJobs(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch job listings');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const filterJobs = useCallback(() => {
    let result = jobs;

    if (searchTerm) {
      result = result.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.city) {
      result = result.filter(job => 
        job.company_city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    if (filters.company) {
      result = result.filter(job => 
        job.company_name.toLowerCase().includes(filters.company.toLowerCase())
      );
    }

    if (filters.minSalary) {
      result = result.filter(job => job.salary_min >= parseInt(filters.minSalary));
    }

    setFilteredJobs(result);
  }, [searchTerm, filters, jobs]);

  useEffect(() => {
    filterJobs();
  }, [filterJobs]);

  const handleViewMore = (jobId) => {
    setSelectedJobId(jobId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJobId(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Job Listings</h2>
        
        <div className="mb-8 flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Filter by city"
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Filter by company"
            name="company"
            value={filters.company}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Minimum salary"
            name="minSalary"
            value={filters.minSalary}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredJobs.map((job) => (
            <Card key={job.id} job={job} onViewMore={() => handleViewMore(job.id)} />
          ))}
        </div>
      </div>
      <JobDetail 
        jobId={selectedJobId} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};

JobList.propTypes = {
  searchTerm: PropTypes.string,
};