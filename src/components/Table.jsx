import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuth from "../useAuth";

export const Table = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filters, setFilters] = useState({
    jobType: "",
    companyName: "",
    location: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        "https://dev-example.sanbercloud.com/api/job-vacancy"
      );
      setJobs(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch job listings");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!user || !user.token) {
      setError("You must be logged in to delete a job");
      return;
    }

    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await axios.delete(
          `https://dev-example.sanbercloud.com/api/job-vacancy/${id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        fetchJobs();
        setError(null);
      } catch (err) {
        console.error("Delete error:", err);
        setError(
          "Failed to delete job. " +
            (err.response?.data?.message || "Please try again.")
        );
      }
    }
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Search function
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Apply sorting, filtering, and searching
  const filteredAndSortedJobs = jobs
    .filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.jobType === "" || job.job_type === filters.jobType) &&
      (filters.companyName === "" || job.company_name.includes(filters.companyName)) &&
      (filters.location === "" || job.company_city.includes(filters.location))
    )
    .sort((a, b) => {
      if (sortConfig.key) {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
      }
      return 0;
    });

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="p-4">
        <input
          type="text"
          placeholder="Search by job title"
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border rounded mb-4 w-full"
        />
        <div className="grid grid-cols-3 gap-4 mb-4">
          <select
            name="jobType"
            value={filters.jobType}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">All Job Types</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Onsite">Onsite</option>
            <option value="Work From Home">Work From Home</option>
          </select>
          <input
            type="text"
            name="companyName"
            placeholder="Filter by company"
            value={filters.companyName}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="location"
            placeholder="Filter by location"
            value={filters.location}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          />
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort('title')}>
              Job Title {sortConfig.key === 'title' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort('company_name')}>
              Company {sortConfig.key === 'company_name' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort('company_city')}>
              Location {sortConfig.key === 'company_city' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort('job_type')}>
              Job Type {sortConfig.key === 'job_type' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort('salary_min')}>
              Salary Range {sortConfig.key === 'salary_min' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedJobs.map((job) => (
            <tr
              key={job.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {job.title}
              </th>
              <td className="px-6 py-4">{job.company_name}</td>
              <td className="px-6 py-4">{job.company_city}</td>
              <td className="px-6 py-4">{job.job_type}</td>
              <td className="px-6 py-4">
                Rp {job.salary_min.toLocaleString()} - Rp{" "}
                {job.salary_max.toLocaleString()}
              </td>
              <td className="px-6 py-4">
                <Link
                  to={`/dashboard/list-job-vacancy/edit/${job.id}`}
                  className="text-white bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2.5"
                  disabled={!user || !user.token}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};