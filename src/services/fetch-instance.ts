import { toast } from 'react-toastify';

// const VITE_BASE_URL =  import.meta.env.VITE_BASE_URL ;

interface RequestConfig extends RequestInit {
  showSuccessToast?: boolean;
  successMessage?: string;
  showErrorToast?: boolean;
}

// Handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      message: response.statusText || 'Something went wrong' 
    }));
    throw new Error(error.message);
  }
  return await response.json();
};

// Generic fetch wrapper with toast
const fetchWithToast = async (
  config: RequestConfig = {}
) => {
  const {
    showSuccessToast = false,
    successMessage = 'Operation successful',
    showErrorToast = true,
    ...fetchConfig
  } = config;

  try {
    const response = await fetch(`/data/db.json`, {
      ...fetchConfig,
      headers: {
        'Content-Type': 'application/json',
        ...fetchConfig.headers,
      },
    });
    
    const data = await handleResponse(response);
    
    if (showSuccessToast) {
      toast.success(successMessage);
    }

    return data.users;
  } catch (error) {
    if (showErrorToast) {
      toast.error(error instanceof Error ? error.message : 'Request failed');
    }
    throw error;
  }
};

// API client methods
export const apiClient = {
  get: (config?: RequestConfig) =>
    fetchWithToast({ ...config, method: 'GET' }),

  post: (data?: any, config?: RequestConfig) =>
    fetchWithToast({
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),

  patch: (data?: any, config?: RequestConfig) =>
    fetchWithToast({
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: (data?: any, config?: RequestConfig) =>
    fetchWithToast({
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: (config?: RequestConfig) =>
    fetchWithToast({ ...config, method: 'DELETE' }),
};