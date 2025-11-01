"use client";

import React, { useState, useEffect } from "react";

const ProductDetailsScreen = () => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleImageClick = (image: any) => {
    setSelectedImage(image);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images Section */}
        <div className="flex flex-col items-center space-y-4">
          <img
            src={selectedImage}
            alt="Product"
            className="w-full max-w-lg h-auto object-cover rounded-lg shadow-md"
          />
          <div className="flex space-x-4">
            {product.images.map((image: any, index: any) => (
              <img
                key={index}
                src={image}
                alt={`Product Thumbnail ${index}`}
                className="w-20 h-20 object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-gray-400"
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">
            {product.name}
          </h2>
          <p className="text-lg text-gray-600 mt-2">{product.category}</p>
          <p className="text-sm text-gray-500 mt-1">{product.brand}</p>

          <div className="mt-6">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
            {product.discount && (
              <span className="text-lg text-red-500 ml-4 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-lg">
              Stock: {product.stockQuantity}
            </h3>
            <p className="text-sm text-gray-500">
              {product.stockQuantity > 0 ? "In Stock" : "Out of Stock"}
            </p>
          </div>

          {/* Product Description */}
          <div className="mt-6">
            <h3 className="font-semibold text-xl">Product Description</h3>
            <p className="text-gray-700 mt-2">{product.description}</p>
          </div>

          {/* Product Ratings */}
          <div className="mt-6">
            <h3 className="font-semibold text-xl">Customer Reviews</h3>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">
                {"⭐".repeat(Math.floor(product.rating))}
                {"☆".repeat(5 - Math.floor(product.rating))}
              </span>
              <span className="text-gray-600">
                ({product.reviewCount} Reviews)
              </span>
            </div>
          </div>

          {/* Review List */}
          <div className="mt-4 space-y-4">
            {product.reviews.map((review: any, index: any) => (
              <div key={index} className="border-b pb-4">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{review.userName}</span>
                  <span className="text-sm text-gray-500">({review.date})</span>
                </div>
                <div className="text-yellow-500 mt-1">
                  {"⭐".repeat(Math.floor(review.rating))}
                  {"☆".repeat(5 - Math.floor(review.rating))}
                </div>
                <p className="mt-2 text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>

          {/* Add to Cart / Buy Now */}
          <div className="mt-6 flex space-x-4">
            <button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
              disabled={product.stockQuantity <= 0}
            >
              Add to Cart
            </button>
            <button
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition duration-200"
              disabled={product.stockQuantity <= 0}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsScreen;

const product = {
  name: "Wireless Bluetooth Headphones",
  category: "Electronics",
  brand: "AudioPro",
  price: 99.99,
  originalPrice: 129.99,
  discount: true,
  stockQuantity: 25,
  rating: 4.3,
  reviewCount: 120,
  description:
    "Experience superior sound quality and comfort with the AudioPro Wireless Bluetooth Headphones. Equipped with advanced noise-cancellation technology, long-lasting battery, and ergonomic design.",
  images: [
    "http://res.cloudinary.com/arpeiks/image/upload/v1760623990/product-images/bag-592923490999.jpg",
    "http://res.cloudinary.com/arpeiks/image/upload/v1760623990/product-images/livelystone-006778738615.png",
    "http://res.cloudinary.com/arpeiks/raw/upload/v1760623990/product-images/Vector-627271075872",
    "http://res.cloudinary.com/arpeiks/image/upload/v1760623990/product-images/water-pack-852026423851.webp",
  ],
  reviews: [
    {
      userName: "John Doe",
      date: "2025-10-01",
      rating: 5,
      comment:
        "These headphones are amazing! The sound quality is top-notch, and they’re really comfortable.",
    },
    {
      userName: "Jane Smith",
      date: "2025-09-25",
      rating: 4,
      comment:
        "Good sound quality, but the battery life could be better. Overall happy with my purchase.",
    },
    {
      userName: "Mike Brown",
      date: "2025-09-20",
      rating: 3,
      comment:
        "Average performance. The sound is decent, but I expected better noise cancellation.",
    },
  ],
};
