import { db } from "@/firebase/firebaseconfig";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";

// Configuration type
export interface Configuration {
  id: string;
  quote: string;
  heroBanner: string;
  createdAt?: any;
  updatedAt?: any;
}

interface ConfigurationState {
  configurations: Configuration[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ConfigurationState = {
  configurations: [],
  loading: false,
  error: null,
};

// FETCH CONFIGURATIONS ASYNC THUNK
export const fetchConfigurations = createAsyncThunk(
  "configuration/fetchConfigurations",
  async (_, { rejectWithValue }) => {
    try {
      const configRef = collection(db, "configuration");
      const snapshot = await getDocs(configRef);

      const configs: Configuration[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Configuration[];

      return configs;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch configuration");
    }
  }
);

// SLICE
const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    clearConfigurations: (state) => {
      state.configurations = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConfigurations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchConfigurations.fulfilled,
        (state, action: PayloadAction<Configuration[]>) => {
          state.configurations = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchConfigurations.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload || "An error occurred";
          state.loading = false;
        }
      );
  },
});

// Export actions
export const { clearConfigurations } = configurationSlice.actions;

// Export reducer
export default configurationSlice.reducer;
