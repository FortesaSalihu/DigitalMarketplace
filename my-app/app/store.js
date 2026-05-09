import { configureStore } from "@reduxjs/toolkit";

import categoryReducer from "@/slice/categorySlice";
import subcategoryReducer from "@/slice/subcategorySlice"; // ✅ IMPORT
import authorItemReducer from "@/slice/authorItemSlice";
import itemReducer from "@/slice/itemSlice";
import cartReducer from "@/slice/cartSlice"; //  IMPORT CART
import withdrawMethodReducer from "@/slice/withdrawMethodSlice"; // ✅ IMPORT
export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    subcategories: subcategoryReducer, //  REGISTER
    authorItems: authorItemReducer,
    items: itemReducer,
    cart: cartReducer, // REGISTER CART
    withdrawMethods: withdrawMethodReducer, //  REGISTER
  },
});