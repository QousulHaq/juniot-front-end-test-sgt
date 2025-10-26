import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// Helper: bikin response format mirip responseBuilder
function buildResponse(success: boolean, status: number, data?: any, pagination?: any, message?: string) {
    return NextResponse.json(
        {
            success,
            status,
            data: data || null,
            pagination: pagination || null,
            message: message || null,
        },
        { status }
    );
}

// GET /api/products
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const limit = parseInt(searchParams.get("limit") || "10");
        const page = parseInt(searchParams.get("page") || "1");
        const search = searchParams.get("search") || searchParams.get("q") || "";

        const offset = (page - 1) * limit;

        // Panggil backend API (ganti URL dengan API-mu)
        const backendRes = await axios.get(`${process.env.BACKEND_URL}/products`, {
            params: { limit, offset, search },
        });

        return NextResponse.json(backendRes.data);
    } catch (error: any) {
        console.error("Error in GET /products:", error);
        return buildResponse(false, 500, null, null, "INTERNAL_SERVER_ERROR");
    }
}
