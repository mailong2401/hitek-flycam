// Re-export tất cả các types
export * from './user';
export * from './blog';
export * from './document';
export * from './contact';

// Common types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ComponentType;
}