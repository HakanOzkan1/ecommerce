import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) =>{
      state.quantity>0 ? state.quantity -= 1 : state.quantity=0;
      console.log(action.payload)
      state.products = state.products.filter(product => {
        return product.orderId !== action.payload.orderId
      });
      state.quantity>0 ? state.total -= action.payload.price * action.payload.quantity : state.total=0 ;
    }
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
