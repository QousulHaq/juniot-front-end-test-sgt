import api from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

import type { GetRequestPayload, Product } from "@/types/product";
import type { ApiResponse } from "@/types/response";

export const useGetAllProducts = ({ limit, offset, page, search }: GetRequestPayload) => {
    const response = useQuery<ApiResponse<Product>>({
        queryKey: ["products", { limit, offset, page, search }],
        queryFn: async () => {
            const res = await api.get("/products", {
                params: { limit, offset, page, search },
            });
            return res.data;
        },
    });

    return response;
}