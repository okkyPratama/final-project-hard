import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardNavbar } from '../components/DashboardNavbar';
import { DashboardSidebar } from '../components/DashboardSidebar';
import useAuth from '../useAuth';

export const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { changePassword } = useAuth();
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      setSuccess("");
  
      if (newPassword !== confirmNewPassword) {
        setError("New passwords do not match");
        return;
      }
  
      if (newPassword.length < 8) {
        setError("New password must be at least 8 characters long");
        return;
      }
  
      try {
        const result = await changePassword(currentPassword, newPassword, confirmNewPassword);
        if (result.success) {
          setSuccess("Password changed successfully");
          setTimeout(() => navigate("/dashboard/profile"), 2000);
        } else {
          setError(result.error || "Failed to change password");
        }
      } catch (err) {
        setError("An unexpected error occurred. Please try again.");
      }
    };
  
    return (
      <div>
        <DashboardNavbar />
        <DashboardSidebar />
        <div className="p-4 sm:ml-64">
          <div className="p-4 mt-14">
            <div className="max-w-md mx-auto bg-white rounded-lg border border-gray-200 shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Change Password</h2>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                  <span className="block sm:inline">{success}</span>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentPassword">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    minLength={8}
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmNewPassword">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmNewPassword"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    minLength={8}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };