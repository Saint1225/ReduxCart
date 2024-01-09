import { createSlice } from "@reduxjs/toolkit";

const initialShowCartState = { isShowCart: false, notification: null };

const showCartSlice = createSlice({
  name: "show-cart",
  initialState: initialShowCartState,
  reducers: {
    toggleShowCart(state) {
      state.isShowCart = !state.isShowCart;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const showCartActions = showCartSlice.actions;

export default showCartSlice;
