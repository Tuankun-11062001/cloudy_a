import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { singerApi } from "../../api/singerApi";

const initialState = {
  singers: [],
  loading: true,
  error: "",
};

export const getSingersThunk = createAsyncThunk("singer/get", async () => {
  const res = await singerApi.getAllSinger();
  return res;
});

export const createSingerThunk = createAsyncThunk(
  "singer/create",
  async (data) => {
    const res = await singerApi.createSinger(data);
    return res;
  }
);

export const deleteSingerThunk = createAsyncThunk(
  "singer/delete",
  async (data) => {
    const res = await singerApi.deleteSinger(data);
    return res;
  }
);

export const singerSlice = createSlice({
  name: "singer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get singer
    builder.addCase(getSingersThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSingersThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.singers = actions.payload.data.data;
    });
    builder.addCase(getSingersThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // create
    builder.addCase(createSingerThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createSingerThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.singers = actions.payload.data.data;
    });
    builder.addCase(createSingerThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // delete
    builder.addCase(deleteSingerThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteSingerThunk.fulfilled, (state, actions) => {
      state.loading = false;

      state.singers = actions.payload.data.data;
    });
    builder.addCase(deleteSingerThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });
  },
});

export const {} = singerSlice.actions;
export default singerSlice.reducer;
