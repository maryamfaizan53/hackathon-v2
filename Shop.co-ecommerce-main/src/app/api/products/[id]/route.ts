// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '../../../../sanity/lib/sanity.client';
import { queries } from '../../../../sanity/lib/queries'; // imports { allProducts, singleProductById, singleProductBySlug }

interface Params {
  params: {
    id: string;
  };
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = params;
  try {
    // Determine whether the id parameter is numeric or a slug
    const isNumeric = /^[0-9]+$/.test(id);
    let product;

    if (isNumeric) {
      // Fetch using the product ID
      product = await sanityClient.fetch(queries.singleProductById, { id });
    } else {
      // Fetch using the product slug
      product = await sanityClient.fetch(queries.singleProductBySlug, { slug: id });
    }

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
