import { toast } from 'react-toastify';

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
  return response.json();
};

// Generic fetch wrapper with toast
const fetchWithToast = async (
  endpoint: string = "/data/db.json",
  config: RequestConfig = {}
) => {
  const {
    showSuccessToast = false,
    successMessage = 'Operation successful',
    showErrorToast = true,
    ...fetchConfig
  } = config;

  try {
    const response = await fetch(endpoint, {
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

    return data;
  } catch (error) {
    if (showErrorToast) {
      toast.error(error instanceof Error ? error.message : 'Request failed');
    }
    throw error;
  }
};

// API client methods
export const apiClient = {
  get: (endpoint: string = "/data/db.json", config?: RequestConfig) =>
    fetchWithToast(endpoint, { ...config, method: 'GET' }),

  post: (endpoint: string, data?: any, config?: RequestConfig) =>
    fetchWithToast(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),

  patch: (endpoint: string, data?: any, config?: RequestConfig) =>
    fetchWithToast(endpoint, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: (endpoint: string, data?: any, config?: RequestConfig) =>
    fetchWithToast(endpoint, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: (endpoint: string, config?: RequestConfig) =>
    fetchWithToast(endpoint, { ...config, method: 'DELETE' }),
};