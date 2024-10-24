interface Pagination {
  total: number;
  page: number;
}

interface ControllerResponse<T> {
  data: T;
  message?: string;
  pagination?: Pagination;
}

export abstract class ControllerType<T = unknown> {
  abstract handle(...args: any[]): Promise<ControllerResponse<T>>;
}
