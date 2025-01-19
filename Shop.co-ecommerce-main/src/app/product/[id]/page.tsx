"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

const reviews = [
  {
    id: 1,
    name: "Samantha D.",
    rating: 5,
    comment: "I love this product! The design is unique and fits perfectly.",
    date: "August 14, 2020",
  },
  {
    id: 2,
    name: "Alex M.",
    rating: 4,
    comment: "Great quality! Comfortable and stylish.",
    date: "August 10, 2024",
  },
];

// Define a Product interface to avoid using 'any'
interface Product {
  id?: string;
  _id?: string;
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
  rating?: number;
  // Add any other fields required from your API
}

// Define an interface for an error response
interface ProductError {
  error: string;
}

// Define a union type for the fetched data
type FetchedProduct = Product | ProductError;

export default function ProductPage() {
  // We only use "id" since we're not using a slug.
  const { id } = useParams();
  const { addToWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<FetchedProduct | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Fetch product data dynamically based on "id"
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data: FetchedProduct = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading product data...</div>;
  }

  if ("error" in product) {
    return <div>{product.error}</div>;
  }

  // At this point, product is of type Product.
  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleAddToWishlist = () => {
    const productId = product._id ? product._id.toString() : product.id?.toString() || '';
    addToWishlist({
      id: productId,
      title: product.name,
      price: product.price,
      image: product.imageUrl,
    });
  };

  const handleAddToCart = () => {
    const productId = product._id ? product._id.toString() : product.id?.toString() || '';
    addToCart({
      id: productId,
      title: product.name,
      price: product.price,
      image: product.imageUrl,
      quantity,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-10">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={400}
          height={400}
          className="rounded-lg"
        />
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          {product.description && (
            <p className="text-gray-700 mt-4">{product.description}</p>
          )}
          <div className="flex items-center gap-4 mt-4">
            <span className="text-2xl font-bold text-green-600">
              ${product.price}
            </span>
            <span className="text-yellow-500">
              ★ {product.rating || "N/A"}/5
            </span>
          </div>

          <div className="mt-6">
            <h2 className="font-semibold text-gray-700">Select Size</h2>
            <div className="flex gap-4 mt-2">
              {["Small", "Medium", "Large", "X-Large"].map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === size ? "bg-black text-white" : "bg-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {selectedSize && (
              <p className="text-sm text-green-600 mt-2">
                Selected Size: {selectedSize}
              </p>
            )}
          </div>

          <div className="flex gap-4 mt-6">
            <div className="flex items-center border rounded">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-2 text-xl"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-2 text-xl"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 bg-black text-white rounded-lg"
            >
              Add to Cart
            </button>
          </div>

          <div className="mt-4">
            <button
              onClick={handleAddToWishlist}
              className="px-6 py-2 border-2 border-black rounded hover:bg-black hover:text-white"
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold">Reviews</h2>
        <div className="flex flex-col gap-4 mt-4">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 border rounded-md shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">{review.name}</span>
                <span className="text-yellow-500">★ {review.rating}/5</span>
              </div>
              <p className="text-gray-600 mt-2">{review.comment}</p>
              <span className="text-sm text-gray-400">
                Posted on {review.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
