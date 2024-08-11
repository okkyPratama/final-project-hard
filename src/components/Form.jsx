import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from 'prop-types';
import useAuth from "../useAuth";

export const Form = ({ isEdit = false}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); 
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    company_name: "",
    company_city: "",
    job_description: "",
    job_qualification: "",
    job_type: "",
    job_tenure: "",
    job_status: 1,
    company_image_url: "",
    salary_min: 0,
    salary_max: 0,
  });

  const fetchJob = useCallback(async () => {
    if (isEdit && id) {
      try {
        const response = await axios.get(
          `https://dev-example.sanbercloud.com/api/job-vacancy/${id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` }
          }
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching job:", error);
        setError("Failed to fetch job data. Please try again.");
      }
    }
  }, [isEdit, id, user.token]);

  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:
        name === "job_status" || name === "salary_min" || name === "salary_max"
          ? parseInt(value, 10)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      
      if (isEdit) {
        await axios.put(
          `https://dev-example.sanbercloud.com/api/job-vacancy/${id}`,
          formData,
          config
        );
      } else {
        await axios.post(
          "https://dev-example.sanbercloud.com/api/job-vacancy",
          formData,
          config
        );
      }
      navigate("/dashboard/list-job-vacancy");
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit form. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <h2 className="text-2xl font-bold mb-4">{id ? "Edit Job" : "Create New Job"}</h2>
    {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Company Name
          </label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Company City
          </label>
          <input
            type="text"
            name="company_city"
            value={formData.company_city}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Job Type
          </label>
          <select
            name="job_type"
            value={formData.job_type}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select Job Type</option>
            <option value="onSite">On Site</option>
            <option value="work from home">Work From Home</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Job Description
          </label>
          <textarea
            name="job_description"
            value={formData.job_description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Job Qualification
          </label>
          <textarea
            name="job_qualification"
            value={formData.job_qualification}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Job Tenure
          </label>
          <input
            type="text"
            name="job_tenure"
            value={formData.job_tenure}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            placeholder="e.g., kontrak, magang"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Job Status
          </label>
          <select
            name="job_status"
            value={formData.job_status}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value={1}>Open</option>
            <option value={0}>Closed</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Company Image URL
          </label>
          <input
            type="url"
            name="company_image_url"
            value={formData.company_image_url}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            placeholder="https://example.com/company-logo.png"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Minimum Salary
          </label>
          <input
            type="number"
            name="salary_min"
            value={formData.salary_min}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            min="0"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Maximum Salary
          </label>
          <input
            type="number"
            name="salary_max"
            value={formData.salary_max}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            min="0"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {id ? "Update Job" : "Create Job"}
        </button>
      </form>
    </div>
  );
};

Form.propTypes = {
  isEdit: PropTypes.bool,
}

