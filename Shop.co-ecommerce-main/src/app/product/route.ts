// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '../../sanity/lib/sanity.client';
import { queries } from '../../sanity/lib/queries';

export async function GET(_req: NextRequest) {
  try {
    // Fetch all products from Sanity using the appropriate query.
    const products = await sanityClient.fetch(queries.allProducts);
    return NextResponse.json(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
