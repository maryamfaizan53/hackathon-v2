// // app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { sanityClient } from '../../../../sanity/lib/sanity.client'
import { singleProductQuery } from '../../../../sanity/lib/queries'




interface Params {
  params: {
    id: string
  }
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = params
  try {
    // Convert the ID from string to number
    const productId = parseInt(id, 10)
    if (isNaN(productId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    // Fetch the single product
    const product = await sanityClient.fetch(singleProductQuery, { id: productId })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Failed to fetch product:', error)
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}





// interface Params {
//   params: {
//     id: string
//   }
// }

// export async function GET(_req: NextRequest, { params }: Params) {
//   const { id } = params
//   try {
//     // Convert ID to a number (since your schema uses productId as a number)
//     const productId = parseInt(id, 10)
//     // Fetch the single product from Sanity
//     const product = await sanityClient.fetch(singleProductQuery, { id: productId })

//     if (!product) {
//       return NextResponse.json({ error: 'Product not found' }, { status: 404 })
//     }

//     return NextResponse.json(product)
//   } catch (error) {
//     console.error('Failed to fetch product:', error)
//     return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
//   }
// }
