import { configureStore } from "@reduxjs/toolkit";
import showCartSlice from "./show-cart";
import cartSlice from "./shopping-item";

const store = configureStore({
    reducer: { cartVisible: showCartSlice.reducer, cart: cartSlice.reducer }
});

export default store;