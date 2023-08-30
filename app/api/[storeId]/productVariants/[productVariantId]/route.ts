// /api/[storeId]/productVariants/[productVariantId]/route.ts
import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export async function GET(
  req: Request,
  { params }: { params: { productId: string, productVariantId: string } }
) {
  try {
    const productVariant = await prismadb.productVariant.findUnique({
      where: {
        id: params.productVariantId,
      },
      include: {
        color: true,
        size: true,
      },
    });

    if (!productVariant) {
      return new NextResponse("Product variant not found", { status: 404 });
    }

    return NextResponse.json(productVariant);
  } catch (error) {
    console.error("[PRODUCT_VARIANT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string, productVariantId: string } }
) {
  try {
    const deletedProductVariant = await prismadb.productVariant.delete({
      where: {
        id: params.productVariantId,
      },
    });

    if (!deletedProductVariant) {
      return new NextResponse("Product variant not found", { status: 404 });
    }

    return NextResponse.json(deletedProductVariant);
  } catch (error) {
    console.error("[PRODUCT_VARIANT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string, productVariantId: string } }
) {
  try {
    const body = await req.json();

    const updatedProductVariant = await prismadb.productVariant.update({
      where: {
        id: params.productVariantId,
      },
      data: body,
    });

    if (!updatedProductVariant) {
      return new NextResponse("Product variant not found", { status: 404 });
    }

    return NextResponse.json(updatedProductVariant);
  } catch (error) {
    console.error("[PRODUCT_VARIANT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
