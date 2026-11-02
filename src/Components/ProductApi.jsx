import React, { useEffect, useState } from "react";
import { ProductsCard } from "./ProductsCard";

export const ProductApi = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("https://dummyjson.com/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        setProducts(data.products);
      } catch (error) {
        console.error("API Error : ", error.message);
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
   useEffect(() => {
    fetchData();
  }, []);

  const searchedProducts = products.filter((product) =>
    product.title
      .toLowerCase()
      .replace(/\s/g, "")
      .includes(searchTerm.toLowerCase().replace(/\s/g, "")),
  );

  const formattedProducts = searchedProducts.map((product) => ({
    id: product.id,
    image: product.thumbnail,
    name: product.title,
    price: product.price,
    rating: product.rating,
  }));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-120">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-[#7C5CFF] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
  return (
    <div className="flex flex-col justify-center items-center h-120 gap-4">
      <p className="text-xl font-semibold text-gray-800">
        Something went wrong!
      </p>

      <p className="text-gray-500">{error}</p>

      <button
        onClick={fetchData}
        className="px-5 py-2 bg-[#7C5CFF] text-white rounded-lg hover:opacity-90"
      >
        Try Again
      </button>
    </div>
  );
}

 if (searchTerm && searchedProducts.length === 0) {
  return (
    <div className="flex flex-col justify-center items-center h-120 gap-4 text-center px-4">

      {/* Search Icon */}
      <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="w-10 h-10 text-[#7C5CFF]"
        >
          <circle cx="11" cy="11" r="7" />
          <path
            strokeLinecap="round"
            d="m20 20-4-4"
          />
        </svg>
      </div>

      {/* Message */}
      <h2 className="text-2xl font-bold text-[#1C1C1E]">
        No Results Found
      </h2>

      <p className="text-gray-500 text-sm max-w-md">
        We couldn't find any products matching your search.
        Try different keywords or check for typos.
      </p>

    </div>
  );
}

  return (
    <ProductsCard
      products={formattedProducts}
      heading={{
        header: "Search Results",
        para: "Products matching your search",
      }}
      isDynamic={true}
    />
  );
};
