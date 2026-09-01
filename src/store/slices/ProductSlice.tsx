import { db } from "@/firebase/firebaseconfig";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";

export interface ProductImage {
  url?: string;
  [key: string]: unknown;
}

export interface Product {
  id: string;
  name?: string;
  title?: string;
  artistName?: string;
  price?: string | number;
  category?: string;
  categoryName?: string;
  imageUrl?: string;
  images?: ProductImage[];
  status?: string;
  [key: string]: unknown;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetched: boolean;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  fetched: false,
};

// Fetch active products once; subsequent dispatches are skipped while cached
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, where("status", "==", "active"));
      const snapshot = await getDocs(q);

      const products: Product[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];

      return products;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch products");
    }
  },
  {
    condition: (_, { getState }) => {
      const { products } = getState() as { products: ProductState };
      // Skip Firebase call if already loaded or in flight
      if (products.fetched || products.loading) return false;
      return true;
    },
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
      return products;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch products");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = [];
      state.error = null;
      state.fetched = false;
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
          state.fetched = true;
        }
      )
      .addCase(fetchProducts.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload || "An error occurred";
        state.loading = false;
      });
  },
});

export const { clearProducts } = productSlice.actions;

export default productSlice.reducer;
