// cartSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [], // an array to store cart items
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      console.log("action.payload cart", action.payload);

      // Add the new cart item to the array
      state.cartItems.push({
        name: action.payload.name,
        email: action.payload.email,
        city: action.payload.city,
        state: action.payload.state,
      });
    },
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
