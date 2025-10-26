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

// GET /api/products/:id
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const backendRes = await axios.get(`${process.env.BACKEND_URL}/products/${id}`);
    if (!backendRes.data) {
      return buildResponse(false, 404, null, null, "PRODUCT_NOT_FOUND");
    }

    return buildResponse(true, 200, backendRes.data);
  } catch (error: any) {
    console.error("Error in GET /products/:id:", error);
    return buildResponse(false, 500, null, null, "INTERNAL_SERVER_ERROR");
  }
}

// PUT /api/products/:id
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const payload = await req.json();

    const backendRes = await axios.put(`${process.env.BACKEND_URL}/products/${id}`, payload);

    return buildResponse(true, 200, backendRes.data);
  } catch (error: any) {
    console.error("Error in PUT /products/:id:", error);
    return buildResponse(false, 500, null, null, "INTERNAL_SERVER_ERROR");
  }
}

// DELETE /api/products/:id
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const backendRes = await axios.delete(`${process.env.BACKEND_URL}/products/${id}`);

    return buildResponse(true, 200, { message: "Product deleted successfully" });
  } catch (error: any) {
    console.error("Error in DELETE /products/:id:", error);
    return buildResponse(false, 500, null, null, "INTERNAL_SERVER_ERROR");
  }
}
