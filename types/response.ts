export interface ApiResponse<T> {
    data: T[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        total_pages: number;
        search?: string | null;
    };
    message?: string;
    is_success?: boolean;
    status_code?: string | null;
    error_code?: string | null;
}