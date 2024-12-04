import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categoryApi } from "../../api/categoryApi";

const initialState = {
  lyrics: [],
  blogs: [],
  book: [],
  shop: [],
  loading: true,
  error: "",
};

export const getCategoryThunk = createAsyncThunk(
  "category/get",
  async (query) => {
    const res = await categoryApi.getAllCategory(query);
    return res;
  }
);

export const createCategoryThunk = createAsyncThunk(
  "category/create",
  async (data) => {
    const res = await categoryApi.createCategory(data);
    return res;
  }
);

export const deleteCategoryThunk = createAsyncThunk(
  "category/delete",
  async (data) => {
    const res = await categoryApi.deleteCategory(data);
    return res;
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get category
    builder.addCase(getCategoryThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategoryThunk.fulfilled, (state, actions) => {
      state.loading = false;
      if (actions.payload.data.categoryType == "lyrics") {
        state.lyrics = actions.payload.data.data;
      }
      if (actions.payload.data.categoryType == "blogs") {
        state.blogs = actions.payload.data.data;
      }
      if (actions.payload.data.categoryType == "book") {
        state.book = actions.payload.data.data;
      }
      if (actions.payload.data.categoryType == "shop") {
        state.shop = actions.payload.data.data;
      }
    });
    builder.addCase(getCategoryThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // create
    builder.addCase(createCategoryThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCategoryThunk.fulfilled, (state, actions) => {
      state.loading = false;
      if (actions.payload.data.categoryType == "lyrics") {
        state.lyrics = actions.payload.data.data;
      }
      if (actions.payload.data.categoryType == "blogs") {
        state.blogs = actions.payload.data.data;
      }
      if (actions.payload.data.categoryType == "book") {
        state.book = actions.payload.data.data;
      }
      if (actions.payload.data.categoryType == "shop") {
        state.shop = actions.payload.data.data;
      }
    });
    builder.addCase(createCategoryThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // delete
    builder.addCase(deleteCategoryThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCategoryThunk.fulfilled, (state, actions) => {
      state.loading = false;
      if (actions.payload.data.categoryType == "lyrics") {
        state.lyrics = actions.payload.data.data;
      }
      if (actions.payload.data.categoryType == "blogs") {
        state.blogs = actions.payload.data.data;
      }
      if (actions.payload.data.categoryType == "book") {
        state.book = actions.payload.data.data;
      }
      if (actions.payload.data.categoryType == "shop") {
        state.shop = actions.payload.data.data;
      }
    });
    builder.addCase(deleteCategoryThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });
  },
});

export const {} = categorySlice.actions;
export default categorySlice.reducer;
