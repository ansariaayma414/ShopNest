import React, { createContext ,useReducer,useContext} from "react";

export const AuthContext = createContext();
  
  const initialState = {
    user: null,
    isAuthenticated: false,
  };
  const authReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          user: action.payload,
          isAuthenticated: true,
        };

      case "LOGOUT":
        return initialState;
      default:
        return state;
    }

  };
 export const AuthProvider = ({children})=>{
  const [state,dispatch] = useReducer(authReducer,initialState);
  return(
    <AuthContext.Provider value={{...state,dispatch}}>
      {children}
    </AuthContext.Provider>
  );
 }
 export const useAuth = () => useContext(AuthContext)
export default AuthContext;
