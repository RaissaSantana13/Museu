export interface ApiResponse<T> {
  status: number;
  timestamp: string;
  mensagem?: string | null;
  erro?: string | null;
  errors?: Record<string, string[]>;
  path?: string;
  metodo?: string;
  dados?: T | T[] | null;
  success: boolean | undefined;
}

export interface SearchParam {
  page?: number;
  pageSize?: number;
  field?: string;
  order?: string;
  search?: string;
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  pageSize: number;
  page: number;
  lastPage: number;
}
