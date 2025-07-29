import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API } from '@/constants/API';
import { ApiResponse, ApiError } from '@/types/api';

class ApiClient {
  private client: AxiosInstance;
  private retryAttempts: number = 0;
  private maxRetries: number = API.retry.attempts;

  constructor() {
    this.client = axios.create({
      baseURL: API.baseURL,
      timeout: API.timeouts.request,
      headers: API.headers,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add authentication token if available
        // Add request logging
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        this.retryAttempts = 0; // Reset retry attempts on success
        return response;
      },
      async (error) => {
        if (this.shouldRetry(error) && this.retryAttempts < this.maxRetries) {
          return this.retryRequest(error.config);
        }
        
        this.retryAttempts = 0; // Reset retry attempts
        return Promise.reject(this.formatError(error));
      }
    );
  }

  private shouldRetry(error: any): boolean {
    const status = error.response?.status;
    const isNetworkError = !error.response;
    const isRetryableStatus = status >= 500 || status === 429;
    
    return isNetworkError || isRetryableStatus;
  }

  private async retryRequest(config: AxiosRequestConfig): Promise<AxiosResponse> {
    this.retryAttempts++;
    const delay = API.retry.delay * Math.pow(API.retry.backoff, this.retryAttempts - 1);
    
    await new Promise(resolve => setTimeout(resolve, delay));
    
    return this.client.request(config);
  }

  private formatError(error: any): ApiError {
    if (error.response) {
      // Server responded with error status
      return {
        code: error.response.data?.code || API.errorCodes.SERVER_ERROR,
        message: error.response.data?.message || 'Server error occurred',
        details: error.response.data?.details,
        statusCode: error.response.status,
      };
    } else if (error.request) {
      // Network error
      return {
        code: API.errorCodes.NETWORK_ERROR,
        message: 'Network error occurred',
        statusCode: 0,
      };
    } else {
      // Other error
      return {
        code: API.errorCodes.SERVER_ERROR,
        message: error.message || 'An unexpected error occurred',
        statusCode: 0,
      };
    }
  }

  // Generic request methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.get(url, config);
      return {
        success: true,
        data: response.data,
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      return {
        success: false,
        error: error,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post(url, data, config);
      return {
        success: true,
        data: response.data,
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      return {
        success: false,
        error: error,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.put(url, data, config);
      return {
        success: true,
        data: response.data,
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      return {
        success: false,
        error: error,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.delete(url, config);
      return {
        success: true,
        data: response.data,
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      return {
        success: false,
        error: error,
        timestamp: new Date().toISOString(),
      };
    }
  }

  // Utility methods
  setAuthToken(token: string) {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  removeAuthToken() {
    delete this.client.defaults.headers.common['Authorization'];
  }

  setBaseURL(url: string) {
    this.client.defaults.baseURL = url;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient; 