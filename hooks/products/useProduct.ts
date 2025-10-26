import api from "@/lib/axiosInstance";
import { useQuery, useMutation } from "@tanstack/react-query";

import type { GetRequestPayload, Product } from "@/types/product";
import type { ApiResponse } from "@/types/response";

export const useGetProduct = (productId: string) => {
    const response = useQuery<ApiResponse<Product>>({
        queryKey: ["products", { productId }],
        queryFn: async () => {
            const res = await api.get("/product", {
                params: { productId },
            });
            return res.data;
        },
    });

    return response;
}

export const useCreateProduct = (options?: {
    onSuccess?: () => void;
    onError?: (error: any) => void;
    onMutate?: () => void;
}) => {
    const { onSuccess, onError, onMutate } = options || {};
    const mutation = useMutation<ApiResponse<Product>, Error, Partial<Product>>({
        mutationFn: async (newProduct) => {
            const res = await api.post("/product", newProduct);
            return res.data;
        },
        onSuccess,
        onError,
        onMutate
    });

    return mutation;
}

export const useEditProduct = (options?: {
    onSuccess?: () => void;
    onError?: (error: any) => void;
    onMutate?: () => void;
}) => {
    const { onSuccess, onError, onMutate } = options || {};
    const mutation = useMutation<ApiResponse<Product>, Error, Partial<Product>>({
        mutationFn: async (newProduct) => {
            const res = await api.put("/product", newProduct);
            return res.data;
        },
        onSuccess,
        onError,
        onMutate
    });

    return mutation;
}

export const useDeleteProduct = (options?: {
    onSuccess?: () => void;
    onError?: (error: any) => void;
    onMutate?: () => void;
}) => {
    const { onSuccess, onError, onMutate } = options || {};
    const mutation = useMutation<ApiResponse<Product>, Error, string>({
        mutationFn: async (productId) => {
            const res = await api.delete("/product", {
                params: { product_id: productId }
            });
            return res.data;
        },
        onSuccess,
        onError,
        onMutate
    });

    return mutation;
}


