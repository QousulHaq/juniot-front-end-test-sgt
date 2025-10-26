import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

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
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const backendRes = await axios.get(`${process.env.BACKEND_URL}/product/${id}`);
    if (!backendRes.data) {
      return buildResponse(false, 404, null, null, "PRODUCT_NOT_FOUND");
    }

    return buildResponse(true, 200, backendRes.data);
  } catch (error: any) {
    console.error("Error in GET /products:", error);
    return buildResponse(false, 500, null, null, "INTERNAL_SERVER_ERROR");
  }
}

// POST /api/products
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    const backendRes = await axios.post(`${process.env.BACKEND_URL}/product`, payload);

    return buildResponse(true, 200, backendRes.data);
  } catch (error: any) {
    console.error("Error in POST /product", error);
    return buildResponse(false, 500, null, null, "INTERNAL_SERVER_ERROR");
  }
}

// PUT /api/products
export async function PUT(req: NextRequest) {
  try {
    const payload = await req.json();

    const backendRes = await axios.put(`${process.env.BACKEND_URL}/product`, payload);

    return buildResponse(true, 200, backendRes.data);
  } catch (error: any) {
    console.error("Error in PUT /products", error);
    return buildResponse(false, 500, null, null, "INTERNAL_SERVER_ERROR");
  }
}

// DELETE /api/products
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const product_id = searchParams.get("product_id");

    const backendRes = await axios.delete(`${process.env.BACKEND_URL}/product`, {
      params: {
        product_id
      }
    });

    return buildResponse(true, 200, { message: "Product deleted successfully" });
  } catch (error: any) {
    console.error("Error in DELETE /products", error);
    return buildResponse(false, 500, null, null, "INTERNAL_SERVER_ERROR");
  }
}
