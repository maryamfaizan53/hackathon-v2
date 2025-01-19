// lib/queries.ts

/**
 * Query to fetch all products.
 * We'll map "imageUrl" to the actual image.asset->url
 */
export const allProductsQuery = `
  *[_type == "product"]{
    "id": productId,
    name,
    "imageUrl": image.asset->url,
    price,
    salePrice,
    quantity,
    rating,
    description
  }
`

/**
 * Query to fetch a single product by "productId".
 * Using [0] returns the first (and only) matched document.
 */
export const singleProductQuery = `
  *[_type == "product" && productId == $id][0]{
    "id": productId,
    name,
    "imageUrl": image.asset->url,
    price,
    salePrice,
    quantity,
    rating,
    description
  }
`
