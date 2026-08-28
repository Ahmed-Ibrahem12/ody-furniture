import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import furnitureProducts from "@/data/furnitureData";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return furnitureProducts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "حدث خطأ أثناء جلب المنتجات.");
    }
  },
);

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
