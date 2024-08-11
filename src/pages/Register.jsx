import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../useAuth';

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
  
      if (password !== confirmPassword) {
        setError("Passwords don't match");
        return;
      }
      if (password.length < 8) {
        setError("Password must be at least 8 characters long");
        return;
      }
  
      try {
        const result = await register(name, email, password, imageUrl);
        if (result.success) {
          console.log('Registration successful:', result.data);
          navigate('/login');
        } else {
          console.error('Registration failed:', result.error);
          setError(result.error);
        }
      } catch (err) {
        console.error('Unexpected error during registration:', err);
        setError('An unexpected error occurred. Please try again.');
      }
    };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-20">
      <div className="px-12 py-6 mt-4 text-left bg-white shadow-lg w-full max-w-md">
        <h3 className="text-2xl font-bold text-center">Create an account</h3>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
            <strong className="font-bold">Registration Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="email">Email</label>
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
              <label className="block" htmlFor="password">Password (min. 8 characters)</label>
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
            <div className="mt-4">
              <label className="block" htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="imageUrl">Profile Image URL</label>
              <input
                type="url"
                placeholder="https://example.com/your-image.jpg"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
            </div>
            <div className="flex items-baseline justify-between mt-4">
              <Link to="/login" className="text-sm text-blue-600 hover:underline">
                Already have an account? Login
              </Link>
              <button 
                type="submit"
                className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};