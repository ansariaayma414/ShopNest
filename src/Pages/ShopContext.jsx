import { createContext, useReducer } from "react";

export const ShopContext = createContext();

const initialState = {
  cart: [],
  wishlist: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

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
        wishlist: state.wishlist.filter((element) => element.id !== action.payload),
      };

    default:
      return state;
  }
}

export const ShopProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ShopContext.Provider value={{ state, dispatch }}>
      {children}
    </ShopContext.Provider>
  );
};
