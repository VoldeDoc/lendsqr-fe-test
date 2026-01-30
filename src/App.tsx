import { useEffect, useState } from 'react';
import './App.css';
import Loading from './utils/loading';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage/loginPage';
import UsersPage from './pages/dashboard/users';
import UserDetailsPage from './pages/dashboard/users/userDetails';
import SignupPage from './pages/Auth/SignupPage/signupPage';
import ProtectedRoute from './services/protected-auth';
import ProfilePage from './pages/dashboard/users/userProfile';
import UsersWithSavingsPage from './components/Dashboard/Users/userWithSavings';
import UsersWithLoansPage from './components/Dashboard/Users/usersWithLoans';
import ActiveUsersPage from './components/Dashboard/Users/activeUsers';
import GuarantorsPage from './components/Dashboard/Users/guarantors';
import ResetPasswordPage from './pages/Auth/Resetpwd/Resetpwd';
import ForgotPasswordPage from './pages/Auth/forgetPwd/forgetpwd';

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <>
      <main>
        {loading ? (
          <Loading message="please wait..." />
        ) : (
          <>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />

              {/* dashboard */}
              <Route path="/dashboard/users" element={<ProtectedRoute>
                <UsersPage /></ProtectedRoute>} />
              <Route
                path="/dashboard/users/:id"
                element={
                  <ProtectedRoute>
                    <UserDetailsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              {/* users with active status */}
              <Route path="/dashboard/users/active" element={<ProtectedRoute><ActiveUsersPage /></ProtectedRoute>} />

              {/* users with loan page */}
              <Route path="/dashboard/users/loans" element={<ProtectedRoute>
                <UsersWithLoansPage /></ProtectedRoute>} />

              {/* users with savings page */}
              <Route path="/dashboard/users/savings" element={<ProtectedRoute>
                <UsersWithSavingsPage /></ProtectedRoute>} />

              {/* usrs guarantors */}
              <Route path="/dashboard/users/:userId/guarantors" element={<ProtectedRoute>
                <GuarantorsPage /></ProtectedRoute>} />

              <Route path="/auth/reset-password" element={<ProtectedRoute>
                <ResetPasswordPage /></ProtectedRoute>} />


            </Routes>
          </>
        )}
      </main>
    </>
  );
}

export default App;