import React from 'react'
import ProductsCard from './ProductsCard'
import { trending } from './array'

export const Trending = ({products,heading}) => {
  return (
    <>
     
    <div key={id}>
        <ProductsCard products={trending}/>
    </div>
 
  </>
  )
}
