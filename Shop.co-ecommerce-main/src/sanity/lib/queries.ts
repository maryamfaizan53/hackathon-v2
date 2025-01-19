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
    "imageUrl": imageUrl
  }`,

  singleProductById: `*[_type == "product" && _id == $id][0]`,

  singleProductBySlug: `*[_type == "product" && slug.current == $slug][0]`,
};
