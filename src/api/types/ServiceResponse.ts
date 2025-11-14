export interface SuccessResponse<T = any> {
    success: true;
    data: T;
    message?: string;
}

export interface ErrorResponse {
    success: false;
    error: string;
    message?: string;
}

export type ServiceResponse<T = any> = SuccessResponse<T> | ErrorResponse;