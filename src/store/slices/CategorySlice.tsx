import { db } from "@/firebase/firebaseconfig";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";

// Category-related types
interface Category {
  id: string;
  name: string;
  description: string;
  image?: string;
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

// Async thunk to fetch categories from Firebase
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      // Create a query that filters only active categories
      const categoriesRef = collection(db, "productCategories");
      const activeCategoriesQuery = query(
        categoriesRef,
        where("isActive", "==", true)
      );

      const snapshot = await getDocs(activeCategoriesQuery);
      const categories: Category[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Category[];

      return categories;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch categories");
    }
  }
);

// Category slice
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    // Optional: Add reducer for clearing categories if needed
    clearCategories: (state) => {
      state.categories = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.categories = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchCategories.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload || "An error occurred";
          state.loading = false;
        }
      );
  },
});

// Export actions
export const { clearCategories } = categorySlice.actions;

// Export reducer
export default categorySlice.reducer;
