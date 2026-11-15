
import React, { useEffect, useState } from "react";
import { ProductsCard } from "./ProductsCard";
import { SearchX, AlertCircle, RefreshCw } from "lucide-react";

export const ProductApi = ({ searchTerm = "" }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://dummyjson.com/products",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        if (error.name === "AbortError") return;

        console.error("API Error:", error.message);
        setError("Unable to load products. Please try again.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [retryCount]);

  // Filter products based on search
  const searchedProducts = products.filter((product) =>
    product.title
      .toLowerCase()
      .replace(/\s/g, "")
      .includes(searchTerm.toLowerCase().replace(/\s/g, ""))
  );

  // Format data for ProductsCard
  const formattedProducts = searchedProducts.map((product) => ({
    id: product.id,
    image: product.thumbnail,
    name: product.title,
    price: product.price,
    rating: product.rating,
  }));

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-[480px] flex-col items-center justify-center gap-5 bg-[#101412] px-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#303A34] border-t-[#3D9B79]" />

        <p className="text-sm font-medium text-[#A5AEA8]">
          Loading products...
        </p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="flex min-h-[480px] flex-col items-center justify-center gap-4 bg-[#101412] px-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#305344] bg-[#1E3A2F]">
          <AlertCircle
            size={34}
            strokeWidth={1.7}
            className="text-[#3D9B79]"
          />
        </div>

        <h2 className="text-2xl font-bold text-[#F4F6F4]">
          Something Went Wrong
        </h2>

        <p className="max-w-md text-sm leading-6 text-[#A5AEA8]">
          {error}
        </p>

        <button
          type="button"
          onClick={() => setRetryCount((count) => count + 1)}
          className="mt-3 flex items-center gap-2 rounded-xl bg-[#3D9B79] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#328568]"
        >
          <RefreshCw size={17} />
          Try Again
        </button>
      </div>
    );
  }

  // No Search Results
  if (searchTerm.trim() && searchedProducts.length === 0) {
    return (
      <div className="flex min-h-[480px] flex-col items-center justify-center gap-4 bg-[#101412] px-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#305344] bg-[#1E3A2F]">
          <SearchX
            size={35}
            strokeWidth={1.6}
            className="text-[#3D9B79]"
          />
        </div>

        <h2 className="text-2xl font-bold text-[#F4F6F4]">
          No Results Found
        </h2>

        <p className="max-w-md text-sm leading-6 text-[#A5AEA8]">
          We couldn't find any products matching
          <span className="font-semibold text-[#F4F6F4]">
            {" "}"{searchTerm}"
          </span>
          . Try different keywords or check for typos.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#101412]">
      <ProductsCard
        products={formattedProducts}
        heading={{
          header: searchTerm.trim()
            ? "Search Results"
            : "Explore Products",
          para: searchTerm.trim()
            ? `Products matching "${searchTerm}"`
            : "Discover products from our collection",
        }}
        isDynamic={true}
      />
    </div>
  );
};
