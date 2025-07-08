interface Pagination {
  total: number;
  page: number;
}

export interface PaginatedResponse<T> {
  pagination: Pagination;
  items: T[];
}

export type ControllerResponse<T> = Promise<{
  data: T;
  message?: string;
}>;
