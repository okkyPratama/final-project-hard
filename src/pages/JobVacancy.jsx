import { Link } from "react-router-dom";
import { Table } from "../components/Table";
import { DashboardNavbar } from "../components/DashboardNavbar";
import { DashboardSidebar } from "../components/DashboardSidebar";


export const JobVacancy = () => {
  return (
    <div>
      <DashboardNavbar />
      <DashboardSidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4  mt-14">
           <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Job Listings</h2>
            <Link to="/dashboard/list-job-vacancy/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create New Job
            </Link>
          </div>
          
          <Table />
        </div>
      </div>
    </div>
  );
};
