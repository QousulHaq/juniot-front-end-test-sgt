export interface Product {
    product_id: string;
    product_title: string;
    product_price: number;
    product_description: string;
    product_image?: string;
    product_category?: string;
    created_timestamp?: string;
    updated_timestamp?: string;
}

export interface GetRequestPayload {
    limit?: number;
    offset?: number;
    page?: number;
    search?: string;
}
