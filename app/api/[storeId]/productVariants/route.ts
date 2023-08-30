// /api/[storeId]/productVariants/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const { colorId, sizeId, quantity } = body;

    // Check if the product with the given ID exists
    const existingProduct = await prismadb.product.findUnique({
      where: { id: params.productId },
    });

    if (!existingProduct) {
      return new NextResponse("Product not found", { status: 404 });
    }

    const productVariant = await prismadb.productVariant.create({
      data: {
        colorId,
        sizeId,
        quantity,
        productId: params.productId,
      },
    });

    return NextResponse.json(productVariant);
  } catch (error) {
    console.error("[PRODUCT_VARIANT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    // Check if the product with the given ID exists
    const existingProduct = await prismadb.product.findUnique({
      where: { id: params.productId },
    });

    if (!existingProduct) {
      return new NextResponse("Product not found", { status: 404 });
    }

    const productVariants = await prismadb.productVariant.findMany({
      where: {
        productId: params.productId,
      },
      include: {
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(productVariants);
  } catch (error) {
    console.error("[PRODUCT_VARIANTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
