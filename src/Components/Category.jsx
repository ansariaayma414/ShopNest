import React from 'react'
import ProductsCard from './ProductsCard'
import { categories } from './array'
import { Link } from 'react-router-dom'

export const Category = () => {
  return (

   
<Link to = "categories">
    <div className="">
  <div className="flex justify-between mt-5 mb-5">
  <div className="">
      <p className="text-2xl font-semibold text-[#1C1C1E]">Shop By category</p>
  </div>
  <div className="">
    <p>View All</p>
  </div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 ">
  {categories.map((category) => (
    <div
      key={category.id}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-40 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {category.name}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {category.subtitle}
        </p>
      </div>
    </div>
  ))}
</div>

</div>
</Link>
  )
}
