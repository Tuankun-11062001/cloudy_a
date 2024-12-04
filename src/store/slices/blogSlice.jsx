import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { lyricsApi } from "../../api/lyricsApi";
import { blogApi } from "../../api/blogApi";

const initialState = {
  blog: [],
  detailBlogs: {},
  loading: true,
  error: "",
};

export const getBlogsThunk = createAsyncThunk("blogs/get", async (query) => {
  const res = await blogApi.getAllBlogs(query);
  return res;
});

export const findBlogsThunk = createAsyncThunk("blogs/getOne", async (id) => {
  const res = await blogApi.findBlogs(id);
  return res;
});

export const createBlogsThunk = createAsyncThunk(
  "blogs/create",
  async (data) => {
    const res = await blogApi.createBlogs(data);
    return res;
  }
);

export const editBlogsThunk = createAsyncThunk("blogs/edit", async (data) => {
  const res = await blogApi.editBlogs(data);
  return res;
});

export const deleteBlogsThunk = createAsyncThunk(
  "blogs/delete",
  async (data) => {
    const res = await blogApi.deleteBlogs(data);
    return res;
  }
);

export const BlogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get lyrics
    builder.addCase(getBlogsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBlogsThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.blog = actions.payload.data.data;
    });
    builder.addCase(getBlogsThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // get lyrics one
    builder.addCase(findBlogsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findBlogsThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.detailBlogs = actions.payload.data.data;
    });
    builder.addCase(findBlogsThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // create
    builder.addCase(createBlogsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBlogsThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.blog = actions.payload.data.data;
    });
    builder.addCase(createBlogsThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // edit
    builder.addCase(editBlogsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editBlogsThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.blog = actions.payload.data.data;
    });
    builder.addCase(editBlogsThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // delete
    builder.addCase(deleteBlogsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteBlogsThunk.fulfilled, (state, actions) => {
      state.loading = false;

      state.blog = actions.payload.data.data;
    });
    builder.addCase(deleteBlogsThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });
  },
});

export const {} = BlogsSlice.actions;
export default BlogsSlice.reducer;
