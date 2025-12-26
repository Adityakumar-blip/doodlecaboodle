import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "./slices/CategorySlice";
import ProductSlice from "./slices/ProductSlice";
import ConfigurationSlice from "./slices/ConfigurationSlice";
import MenuSlice from "./slices/MenuSlice";

// Configure the store
const store = configureStore({
  reducer: {
    categories: CategorySlice,
    products: ProductSlice,
    configuration: ConfigurationSlice,
    menus: MenuSlice,
  },
});

// Export types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
