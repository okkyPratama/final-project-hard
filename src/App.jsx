import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import PropTypes from "prop-types";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./pages/Dashboard";
import { JobVacancy } from "./pages/JobVacancy";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ChangePassword } from "./pages/ChangePassword";
import { CreateJobForm } from "./pages/CreateJobForm";
import { EditJobForm } from "./pages/EditJobForm";
import { NotFound } from "./pages/NotFound";
import { Profile } from "./pages/Profile";
import AuthProvider from './AuthProvider';
import useAuth from './useAuth';

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow flex flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/list-job-vacancy"
                element={
                  <PrivateRoute>
                    <JobVacancy />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/list-job-vacancy/create"
                element={
                  <PrivateRoute>
                    <CreateJobForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/list-job-vacancy/edit/:id"
                element={
                  <PrivateRoute>
                    <EditJobForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/change-password"
                element={
                  <PrivateRoute>
                    <ChangePassword />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
