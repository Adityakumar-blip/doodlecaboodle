import { db } from "@/firebase/firebaseconfig";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";

// Product-related types
interface Product {
  id: string;
  imageUrl: string;
  title: string;
  artistName: string;
  price: string;
  category: string;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// Async thunk to fetch products from Firebase
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const productsRef = collection(db, "products");
      const snapshot = await getDocs(productsRef);
      const products: Product[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      return products;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch products");
    }
  }
);

export const fetchWroks = createAsyncThunk(
  "products/fetchWroks",
  async (_, { rejectWithValue }) => {
    try {
      const productsRef = collection(db, "ourworks");
      const snapshot = await getDocs(productsRef);
      const products: Product[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      console.log("products", products)
      return products;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch products");
    }
  }
);

// Product slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Optional: Add reducer for clearing products if needed
    clearProducts: (state) => {
      state.products = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchProducts.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload || "An error occurred";
        state.loading = false;
      });
  },
});

// Export actions
export const { clearProducts } = productSlice.actions;

// Export reducer
export default productSlice.reducer;
