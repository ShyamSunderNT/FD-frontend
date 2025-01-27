import React, { useReducer, useContext, createContext } from "react";

// Create contexts for state and dispatch
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Reducer function to handle cart actions
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];

    case "REMOVE":
      return state.filter((_, index) => index !== action.index);

    case "DROP":
      return []; // Clear the cart

    case "UPDATE":
      return state.map((item) =>
        item.id === action.id
          ? {
              ...item,
              qty: parseInt(action.qty, 10), // Ensure qty is a number
              price: (item.price / item.qty) * parseInt(action.qty, 10), // Update price based on new qty
            }
          : item
      );

    default:
      console.error(`Unhandled action type: ${action.type}`);
      return state;
  }
};

// CartProvider component to wrap the application
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

// Custom hook to access cart state
export const useCart = () => {
  const state = useContext(CartStateContext);
  return state || []
};

// Custom hook to access cart dispatch
export const useDispatchCart = () => {
  const dispatch = useContext(CartDispatchContext);
  return dispatch || (() => {});
};
