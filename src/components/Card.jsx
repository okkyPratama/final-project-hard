import PropTypes from 'prop-types';

export const Card = ({ job, onViewMore }) => {
  const title = job.title || 'Untitled Job';
  const companyName = job.company_name || 'Unknown Company';
  const companyCity = job.company_city || 'Unknown Location';
  const jobTenure = job.job_tenure || 'Not specified';
  const jobType = job.job_type || 'Not specified';
  const salaryMin = job.salary_min != null ? job.salary_min.toLocaleString() : 'N/A';
  const salaryMax = job.salary_max != null ? job.salary_max.toLocaleString() : 'N/A';
  const companyImageUrl = job.company_image_url || 'https://via.placeholder.com/150';

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full">
      <img
        className="w-1/2 h-32 object-contain rounded-t-lg"
        src={companyImageUrl}
        alt={companyName}
      />
      <div className="p-4 flex-grow flex flex-col">
        <div>
          <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
            {title}
          </h5>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
            {companyName} - {companyCity}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
            {jobTenure} - {jobType}
          </p>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-400">
            Rp {salaryMin} - Rp {salaryMax}
          </p>
        </div>
        <button
          onClick={() => onViewMore(job.id)}
          className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4"
        >
          View More
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.number,
    company_image_url: PropTypes.string,
    company_name: PropTypes.string,
    title: PropTypes.string,
    company_city: PropTypes.string,
    job_tenure: PropTypes.string,
    job_type: PropTypes.string,
    salary_min: PropTypes.number,
    salary_max: PropTypes.number,
  }),
  onViewMore: PropTypes.func.isRequired,
};

Card.defaultProps = {
  job: {},
};