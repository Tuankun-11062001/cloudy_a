import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { shopApi } from "../../api/shopApi";

const initialState = {
  products: [],
  detailProduct: {},
  loading: true,
  error: "",
};

export const getProductThunk = createAsyncThunk("shop/get", async (query) => {
  const res = await shopApi.getAllProduct(query);
  return res;
});

export const findProductThunk = createAsyncThunk("shop/getOne", async (id) => {
  const res = await shopApi.findProduct(id);
  return res;
});

export const createProductThunk = createAsyncThunk(
  "shop/create",
  async (data) => {
    const res = await shopApi.createProduct(data);
    return res;
  }
);

export const editProductThunk = createAsyncThunk("shop/edit", async (data) => {
  const res = await shopApi.editProduct(data);
  return res;
});

export const deleteProductThunk = createAsyncThunk(
  "shop/delete",
  async (data) => {
    const res = await shopApi.deleteProduct(data);
    return res;
  }
);

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all
    builder.addCase(getProductThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.products = actions.payload.data.data;
    });
    builder.addCase(getProductThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // get
    builder.addCase(findProductThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findProductThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.detailProduct = actions.payload.data.data;
    });
    builder.addCase(findProductThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // create
    builder.addCase(createProductThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProductThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.products = actions.payload.data.data;
    });
    builder.addCase(createProductThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // edit
    builder.addCase(editProductThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editProductThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.products = actions.payload.data.data;
    });
    builder.addCase(editProductThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // delete
    builder.addCase(deleteProductThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProductThunk.fulfilled, (state, actions) => {
      state.loading = false;

      state.products = actions.payload.data.data;
    });
    builder.addCase(deleteProductThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });
  },
});

export const {} = shopSlice.actions;
export default shopSlice.reducer;
