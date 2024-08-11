import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../useAuth";
export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
  
      if (password.length < 8) {
        setError("Password must be at least 8 characters long");
        return;
      }
  
      try {
        const result = await login(email, password);
        if (result.success) {
          const from = location.state?.from?.pathname || "/dashboard";
          navigate(from, { replace: true });
        } else {
          setError(result.error);
        }
      } catch (err) {
        console.error('Unexpected error during login:', err);
        setError('An unexpected error occurred. Please try again.');
      }
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-20">
      <div className="px-12 py-6 mt-4 text-left bg-white shadow-lg w-full max-w-md">
        <h3 className="text-2xl font-bold text-center">
          Login to your account
        </h3>
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
            role="alert"
          >
            <strong className="font-bold">Login Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">
                Password (min. 8 characters)
              </label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <div className="flex items-baseline justify-between mt-4">
              <Link
                to="/register"
                className="text-sm text-blue-600 hover:underline"
              >
                Does not have an account? Register
              </Link>
              <button
                type="submit"
                className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};