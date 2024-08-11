import { DashboardNavbar } from "../components/DashboardNavbar";
import { DashboardSidebar } from "../components/DashboardSidebar";
import useAuth from "../useAuth";
export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <DashboardNavbar />
      <DashboardSidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 mt-14">
          <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Welcome, {user?.name || 'User'}!</h2>
          </div>
        </div>
      </div>
    </div>
  );
};