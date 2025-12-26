import { db } from "@/firebase/firebaseconfig";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

// Menu item interface
export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  displayOrder: number;
  isActive: boolean;
  createdAt: any;
  updatedAt: any;
}

interface MenuState {
  menus: MenuItem[];
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  menus: [],
  loading: false,
  error: null,
};

// Async thunk to fetch menus from Firebase
export const fetchMenus = createAsyncThunk(
  "menus/fetchMenus",
  async (_, { rejectWithValue }) => {
    try {
      const menusRef = collection(db, "menus");
      // Simplify query: remove filters and order to debug if data is fetched at all
      const snapshot = await getDocs(menusRef);
      const menus: MenuItem[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as MenuItem[];
      console.log("menus", menus)
      return menus;
    } catch (error: any) {
      console.error("Error fetching menus:", error);
      return rejectWithValue(error.message || "Failed to fetch menus");
    }
  }
);

const menuSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenus.fulfilled, (state, action: PayloadAction<MenuItem[]>) => {
        state.menus = action.payload;
        state.loading = false;
      })
      .addCase(fetchMenus.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload || "An error occurred";
        state.loading = false;
      });
  },
});

export default menuSlice.reducer;
