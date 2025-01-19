// sanity/lib/queries.ts
export const queries = {
  allProducts: `*[_type == "product"]{
    _id,
    name,
    description,
    price,
    discountPercent,
    isNew,
    colors,
    sizes,
    category,
    "imageUrl": imageUrl,
    rating
  }`,

  singleProductById: `*[_type == "product" && _id == $id][0]`,
  
  // You can remove or ignore the slug query if you're not using it:
  // singleProductBySlug: `*[_type == "product" && slug.current == $slug][0]`,
};
