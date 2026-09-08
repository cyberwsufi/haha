export interface FilterParams {
  search: string;
  category: string;
  tags: string[];
  sortBy: string;
  page: number;
  perPage: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

export interface ModalConfig {
  isOpen: boolean;
  title: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: string;
}
