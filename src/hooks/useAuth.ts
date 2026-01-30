import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import type { AppDispatch, RootState } from "../context/store";
import { 
  forgotPassword, 
  loginUser, 
  logoutUser, 
  resetPassword, 
  signupUser 
} from "../context/store/auth";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const login = async (email: string, password: string) => {
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      toast.success('Login successful!');
    } catch (err: any) {
      const errorMessage = err?.message;
      if (errorMessage?.includes('<!doctype') || errorMessage?.includes('is not valid JSON')) {
        toast.error('Unable to connect to server. Please ensure the backend is running.');
      } else if (errorMessage?.includes('Invalid email or password')) {
        toast.error('Invalid email or password');
      } else if (errorMessage?.includes('network') || errorMessage?.includes('fetch')) {
        toast.error('Network error. Please check your connection.');
      } else {
        toast.error(errorMessage || 'Login failed. Please try again.');
      }
      throw err;
    }
  };

  const signup = async (data: { fullName: string; email: string; password: string }) => {
    try {
      await dispatch(signupUser(data)).unwrap();
      toast.success('Account created successfully! Please login.');
    } catch (err: any) {
      const errorMessage = err?.message;
      if (errorMessage?.includes('<!doctype') || errorMessage?.includes('is not valid JSON')) {
        toast.error('Unable to connect to server. Please ensure the backend is running.');
      } else if (errorMessage?.includes('already exists')) {
        toast.error('An account with this email already exists.');
      } else {
        toast.error(errorMessage || 'Signup failed. Please try again.');
      }
      throw err;
    }
  };

  const forgotPasswordAuth = async (email: string) => {
    try {
      await dispatch(forgotPassword(email)).unwrap();
      toast.success('Password reset link sent to your email!');
    } catch (err: any) {
      const errorMessage = err?.message;
      if (errorMessage?.includes('No account found')) {
        toast.error('No account found with this email address.');
      } else if (errorMessage?.includes('<!doctype') || errorMessage?.includes('is not valid JSON')) {
        toast.error('Unable to connect to server. Please ensure the backend is running.');
      } else if (errorMessage?.includes('network') || errorMessage?.includes('fetch')) {
        toast.error('Network error. Please check your connection.');
      } else {
        toast.error(errorMessage || 'Failed to send reset link. Please try again.');
      }
      throw err;
    }
  };

  const resetPasswordAuth = async (token: string, newPassword: string) => {
    try {
      await dispatch(resetPassword({ token, newPassword })).unwrap();
      toast.success('Password reset successful! Please login with your new password.');
    } catch (err: any) {
      const errorMessage = err?.message;
      if (errorMessage?.includes('Invalid') || errorMessage?.includes('expired')) {
        toast.error('Invalid or expired reset token. Please request a new reset link.');
      } else if (errorMessage?.includes('<!doctype') || errorMessage?.includes('is not valid JSON')) {
        toast.error('Unable to connect to server. Please ensure the backend is running.');
      } else if (errorMessage?.includes('network') || errorMessage?.includes('fetch')) {
        toast.error('Network error. Please check your connection.');
      } else {
        toast.error(errorMessage || 'Failed to reset password. Please try again.');
      }
      throw err;
    }
  };

  const logout = () => {
    dispatch(logoutUser());
    toast.info('Logged out successfully');
  };

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    signup,
    logout,
    forgotPassword: forgotPasswordAuth,
    resetPassword: resetPasswordAuth,
  };
};