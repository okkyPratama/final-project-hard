import { DashboardNavbar } from "../components/DashboardNavbar";
import { DashboardSidebar } from "../components/DashboardSidebar";
import { Form } from "../components/Form";
import { Link } from "react-router-dom";

export const CreateJobForm = () => {
  return (
    <div className="min-h-screen">
      <DashboardNavbar />
      <DashboardSidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 mt-14">
          <nav className="flex mb-5" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link
                  to="/dashboard/list-job-vacancy"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Job Listings
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="ml-1 text-gray-500 md:ml-2 font-medium">
                    Add New Job
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          <h2 className="text-2xl font-bold mb-5">Add New Job</h2>
          <Form isEdit={false} />
        </div>
      </div>
    </div>
  );
};