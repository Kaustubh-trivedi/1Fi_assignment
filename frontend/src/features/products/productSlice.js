import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts, getProductBySlug } from "./productApi";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    return await getProducts();
  }
);

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (slug) => {
    return await getProductBySlug(slug);
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (data) => {
    return await createProduct(data);
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: null,
    emiPlans: [],
    loading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })

      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload.product;
        state.emiPlans = action.payload.emiPlans;
      });
  },
});

export default productSlice.reducer;