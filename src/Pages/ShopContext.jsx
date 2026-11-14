import { createContext, useReducer , useEffect } from "react";

export const ShopContext = createContext();

const initialState = {
  cart: [],
  wishlist: [],
  orders:[],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const exists = state.cart.some(
        (product) => product.id === action.payload.id,
      );

      if (exists) {
        return {
          ...state,
          cart: state.cart.map((product) =>
            product.id === action.payload.id
              ? { ...product, quantity: product.quantity + 1 }
              : product,
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, action.payload],
          
        };
      }
    }

    case "ADD_TO_WISHLIST":
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((element) => element.id !== action.payload),
      };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (element) => element.id !== action.payload,
        ),
      };
    case "INCREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((product) =>
          product.id === action.payload
            ? { ...product, quantity: product.quantity + 1 }
            : product,
        ),
      };

    case "DECREASE_QUANTITY": {
      const updatedCart = state.cart.map((product) =>
        product.id === action.payload
          ? { ...product, quantity: product.quantity - 1 }
          : product
      );

      return {
        ...state,
        cart: updatedCart.filter(
          (product) => product.quantity > 0
        ),
      };
    }

      case "PLACE_ORDER":
        return{
          ...state,
          orders:[...state.orders,action.payload],
          cart:[],
        }



    default:
      return state;
  }
}

export const ShopProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(reducer, initialState);


const [state, dispatch] = useReducer(
  reducer,
  initialState,
  (initial) => {
    try {
      const savedState = localStorage.getItem("shopnest-state");

      return savedState
        ? { ...initial, ...JSON.parse(savedState) }
        : initial;
    } catch {
      return initial;
    }
  }
);

useEffect(() => {
  localStorage.setItem("shopnest-state", JSON.stringify(state));
}, [state]);


  return (
    <ShopContext.Provider value={{ state, dispatch }}>
      {children}
    </ShopContext.Provider>
  );
};
