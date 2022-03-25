export interface ApiResponseError {
  error: unknown;
}

export interface ApiResponse<T> {
  success: boolean;
  data: undefined | T | ApiResponseError;
}
