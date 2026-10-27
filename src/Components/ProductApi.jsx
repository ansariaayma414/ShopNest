import React, { useEffect, useState } from "react";
import { ProductsCard } from "./ProductsCard";

export const ProductApi = ({ searchTerm }) => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {

      setLoading(true);

      const response = await fetch(
        "https://dummyjson.com/products"
      );

      const data = await response.json();

      setProducts(data.products);

      setLoading(false);

      console.log(data.products);
    };

    fetchData();

  }, []);

  const searchedProducts = products.filter((product) =>
    product.title
      .toLowerCase()
      .replace(/\s/g, "")
      .includes(
        searchTerm.toLowerCase().replace(/\s/g, "")
      )
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
      <p className="flex justify-center items-center h-120 text-3xl">
        Loading.....
      </p>
    );
  }

  if (searchTerm && searchedProducts.length === 0) {
    return (
      <p className="flex justify-center items-center h-120 text-3xl">
        No results found
      </p>
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
