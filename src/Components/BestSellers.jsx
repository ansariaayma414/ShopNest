import React from "react";
import ProductsCard from "./ProductsCard";
import { bestSellers } from "./array";

export const BestSellers = ({ products }) => {
  return (
    <div>
      <div className="flex justify-between mt-5 mb-5">
        <div className="">
          <p className="text-2xl font-semibold text-[#1C1C1E]">
            Shop By category
          </p>
        </div>
        <div className="">
          <p>View All</p>
        </div>
      </div>
      <div>
        <ProductsCard products={bestSellers} />
      </div>
    </div>
  );
};
