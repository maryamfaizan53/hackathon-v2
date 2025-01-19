import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '../../../../sanity/lib/sanity.client';
import { queries } from '../../../../sanity/lib/queries';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = params;

  // Guard: Ensure a product identifier was provided.
  if (!id) {
    return NextResponse.json(
      { error: "No product identifier provided" },
      { status: 400 }
    );
  }

  try {
    // Use the singleProductById query (ID-only version)
    const product = await sanityClient.fetch(queries.singleProductById, { id });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
