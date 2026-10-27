import React from "react";
import { useSearchParams } from "react-router-dom";
import { ProductApi } from "../Components/ProductApi";

export const SearchResults = () => {

  const [searchParams] = useSearchParams();

  const searchTerm = searchParams.get("q") || "";

  return (
    <ProductApi searchTerm={searchTerm} />
  );
};

