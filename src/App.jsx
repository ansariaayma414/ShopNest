import { Navbar } from "./Components/Navbar";
import Hero from "./Components/Hero";

import { ProductsCard } from "./Components/ProductsCard";

import {
  arrivals,
  arrivalsHeading,
  bestSellers,
  bestSellersHeading,
  trending,
  trendingHeading,
} from "./Components/array";

import { Advertisment } from "./Components/Advertisment";
import { WhyShopnest } from "./WhyShopnest";
import Newsletter from "./Components/Newsletter";
import Footer from "./Components/Footer";
import { Category } from "./Components/Category";

import { ProductDetailsPage } from "./Pages/ProductDetailsPage";
import { SearchResults } from "./Pages/SearchResults";
import Cart from "./Pages/Cart";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ShopProvider } from "./Pages/ShopContext";
import Wishlist from "./Pages/WishList";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";

export const App = () => {
  return (
    <ShopProvider>
      <BrowserRouter>
      <Signup/>
      {/* <Login/> */}
        <Navbar />

        <Routes>
          {/* HOME */}
          <Route
            path="/"
            element={
              <>
                <Hero />

                <div className="max-w-[1200px] mx-auto">
                  <Category />

                  <ProductsCard products={arrivals} heading={arrivalsHeading} />

                  <ProductsCard products={trending} heading={trendingHeading} />

                  <ProductsCard
                    products={bestSellers}
                    heading={bestSellersHeading}
                  />

                  <Advertisment />

                  <WhyShopnest />

                  <Newsletter />
                </div>

                <Footer />
              </>
            }
          />

          {/* SEARCH */}
          <Route path="/search" element={<SearchResults />} />

          {/* PRODUCT DETAILS */}
          <Route path="/product/:id" element={<ProductDetailsPage />} />

          {/* CATEGORIES */}
          <Route path="/categories" element={<Category />} />

          {/* CART */}
          <Route path="/cart" element={<Cart />} />
          {/* WISHLIST */}
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </BrowserRouter>
    </ShopProvider>
  );
};

export default App;
