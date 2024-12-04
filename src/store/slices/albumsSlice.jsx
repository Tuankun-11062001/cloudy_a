import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { albumsApi } from "../../api/albumsApi";

const initialState = {
  albums: [],
  loading: true,
  error: "",
};

export const getAlbumsThunk = createAsyncThunk("album/get", async () => {
  const res = await albumsApi.getAllAlbums();
  return res;
});

export const createAlbumThunk = createAsyncThunk(
  "album/create",
  async (data) => {
    const res = await albumsApi.createAlbum(data);
    return res;
  }
);

export const deleteAlbumThunk = createAsyncThunk(
  "album/delete",
  async (data) => {
    const res = await albumsApi.deleteAlbum(data);
    return res;
  }
);

export const albumSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get country
    builder.addCase(getAlbumsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAlbumsThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.albums = actions.payload.data.data;
    });
    builder.addCase(getAlbumsThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // create
    builder.addCase(createAlbumThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAlbumThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.albums = actions.payload.data.data;
    });
    builder.addCase(createAlbumThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // delete
    builder.addCase(deleteAlbumThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAlbumThunk.fulfilled, (state, actions) => {
      state.loading = false;

      state.albums = actions.payload.data.data;
    });
    builder.addCase(deleteAlbumThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });
  },
});

export const {} = albumSlice.actions;
export default albumSlice.reducer;
