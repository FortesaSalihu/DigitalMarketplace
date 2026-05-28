import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "@/slice/categorySlice";
import subcategoryReducer from "@/slice/subcategorySlice";
import authorItemReducer from "@/slice/authorItemSlice";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    subcategories: subcategoryReducer,
    authorItems: authorItemReducer,
  },
});
