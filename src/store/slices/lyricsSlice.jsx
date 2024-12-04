import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { lyricsApi } from "../../api/lyricsApi";

const initialState = {
  songs: [],
  detailLyrics: {},
  loading: true,
  error: "",
};

export const getLyricsThunk = createAsyncThunk("lyrics/get", async (query) => {
  const res = await lyricsApi.getAllLyrics(query);
  return res;
});

export const findLyricsThunk = createAsyncThunk("lyrics/getOne", async (id) => {
  const res = await lyricsApi.findLyrics(id);
  return res;
});

export const createLyricsThunk = createAsyncThunk(
  "lyrics/create",
  async (data) => {
    const res = await lyricsApi.createLyrics(data);
    return res;
  }
);

export const editLyricsThunk = createAsyncThunk("lyrics/edit", async (data) => {
  const res = await lyricsApi.editLyrics(data);
  return res;
});

export const deleteLyricsThunk = createAsyncThunk(
  "lyrics/delete",
  async (data) => {
    const res = await lyricsApi.deleteLyrics(data);
    return res;
  }
);

export const lyricsSlice = createSlice({
  name: "lyrics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get lyrics
    builder.addCase(getLyricsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getLyricsThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.songs = actions.payload.data.data;
    });
    builder.addCase(getLyricsThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // get lyrics one
    builder.addCase(findLyricsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findLyricsThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.detailLyrics = actions.payload.data.data;
    });
    builder.addCase(findLyricsThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // create
    builder.addCase(createLyricsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createLyricsThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.songs = actions.payload.data.data;
    });
    builder.addCase(createLyricsThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // edit
    builder.addCase(editLyricsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editLyricsThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.songs = actions.payload.data.data;
    });
    builder.addCase(editLyricsThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // delete
    builder.addCase(deleteLyricsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteLyricsThunk.fulfilled, (state, actions) => {
      state.loading = false;

      state.songs = actions.payload.data.data;
    });
    builder.addCase(deleteLyricsThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });
  },
});

export const {} = lyricsSlice.actions;
export default lyricsSlice.reducer;
