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
      let orderStorage = [];
      state.products.forEach(product => orderStorage.push(product.orderId))
      if(Math.max(...orderStorage)>=action.payload.orderId){
        action.payload.orderId = Math.max(...orderStorage)+1
      }
      state.products.push(action.payload);
      console.log(action.payload.orderId)
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) =>{
      state.quantity>0 ? state.quantity -= 1 : state.quantity=0;
      state.products = state.products.filter(product => {
        return product.orderId !== action.payload.orderId
      });
      state.quantity>0 ? state.total -= action.payload.price * action.payload.quantity : state.total=0 ;
    }
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
