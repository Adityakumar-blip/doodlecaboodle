import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "./slices/CategorySlice";
import ProductSlice from "./slices/ProductSlice";

// Configure the store
const store = configureStore({
  reducer: {
    categories: CategorySlice,
    products: ProductSlice,
  },
});

// Export types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
