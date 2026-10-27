import hero1 from "../assets/Hero-image.png";
import hero2 from "../assets/hero-2.png";
import hero3 from "../assets/hero-3.png";
import women from "../assets/women.jpg";
import man from "../assets/man.avif";
import electronics from "../assets/headphones.jpg";
import home_decor from "../assets/home-decor.jpg";
import beauty from "../assets/beauty.jpg";
import sports from "../assets/sports.jpg";
import shirt from '../assets/shirt.jpg'
import mini_dress from '../assets/mini-dress.jpg'
import shoes from '../assets/shoes.jpg'
import backpack from '../assets/backpack.jpg';
import smart_watch from '../assets/smart-watch.webp'
import handbag from '../assets/handbag.webp'

export const slides = [
  {
    image: hero1,
    title: "Welcome to ShopNest",
    description: "Everything you need, all in one place.",
  },
  {
    image: hero2,
    title: "Discover Something New",
    description: "Explore our latest collection.",
  },
  {
    image: hero3,
    title: "Shop With Confidence",
    description: "Quality products at great prices.",
  },
];

export const categories = [
  {
    id: 1,
    name: "Women",
    subtitle: "Fashion & Accessories",
    image: women,
  },
  {
    id: 2,
    name: "Men",
    subtitle: "Clothing & Footwear",
    image: man,
  },
  {
    id: 3,
    name: "Electronics",
    subtitle: "Gadgets & Accessories",
    image: electronics,
  },
  {
    id: 4,
    name: "Home & Living",
    subtitle: "Decor & Essentials",
    image: home_decor,
  },
  {
    id: 5,
    name: "Beauty",
    subtitle: "Skincare & Makeup",
    image: beauty,
  },
  {
    id: 6,
    name: "Sports",
    subtitle: "Fitness & Outdoor",
    image: sports,
  },
];
export const arrivalsHeading = 
  {
    header:"New Arrivals",
    para:"Fresh styles, just for you"
  }


export const arrivals = [
  {
    id:1,
    image:shirt,
    name:"Linen Shirt",
    price:"1,499",
    rating:"4.4 (856)"
  },
  {
    id:2,
    image:mini_dress,
    name:"Mini dress",
    price:"2,399",
    rating:"4.6 (956)"
  },
  {
    id:3,
    image:shoes,
    name:"Casual shoes",
    price:"1,999",
    rating:"4.5(978)"
  },
  {
    id:4,
    image:backpack,
    name:"Backpack",
    price:"1,799",
    rating:"4.7 (1.4k)"
  }

]
export const trending = [
  {
    id:1,
    image:beauty,
    name:"Beauty cosmetics",
    price:"1,499",
    rating:"4.4 (856)"
  },
  {
    id:2,
    image:women,
    name:"Fashion and Accessories",
    price:"2,399",
    rating:"4.7(1.4k)"
  },
  {
    id:3,
    image:shoes,
    name:"Casual shoes",
    price:"1,999",
    rating:"4.5(978)"
  },
  {
    id:4,
    image:home_decor,
    name:"Home and living",
    price:"2,799",
    rating:"4.7 (1.4k)"
  }
]

export const trendingHeading = 
  {
    header:"Trending Products",
    para:"Our trendy products are here!, have a look"
  }
export const bestSellers = [
  {
    id:1,
    image:electronics,
    name:"Wireless Headphones",
    price:"2,499",
    rating:"4.4 (856)"
  },
  {
    id:2,
    image:smart_watch,
    name:"Smart watch",
    price:"2,399",
    rating:"4.7(1.4k)"
  },
  {
    id:3,
    image:shoes,
    name:"Casual shoes",
    price:"1,999",
    rating:"4.5(978)"
  },
  {
    id:4,
    image:handbag,
    name:"Handbag",
    price:"2,799",
    rating:"4.7 (1.4k)"
  }
]
export const bestSellersHeading = {
  header:"Best Sellers",
  para:"Loved by thoughts"
}


