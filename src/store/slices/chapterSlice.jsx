import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { chapterApi } from "../../api/chapterApi";

const initialState = {
  chapters: [],
  detailchapter: {},
  loading: true,
  error: "",
};

export const getChapterThunk = createAsyncThunk(
  "chapters/get",
  async (query) => {
    const res = await chapterApi.getAllChapter(query);
    return res;
  }
);

export const findChapterThunk = createAsyncThunk(
  "chapters/getOne",
  async (id) => {
    const res = await chapterApi.findChapter(id);
    return res;
  }
);

export const createChapterThunk = createAsyncThunk(
  "chapters/create",
  async (data) => {
    const res = await chapterApi.createChapter(data);
    return res;
  }
);

export const editChapterThunk = createAsyncThunk(
  "chapters/edit",
  async (data) => {
    const res = await chapterApi.editChapter(data);
    return res;
  }
);

export const deleteChapterThunk = createAsyncThunk(
  "chapters/delete",
  async (data) => {
    const res = await chapterApi.deleteChapter(data);
    return res;
  }
);

export const chapterSlice = createSlice({
  name: "chapters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get lyrics
    builder.addCase(getChapterThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getChapterThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.chapters = actions.payload.data.data;
    });
    builder.addCase(getChapterThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // get lyrics one
    builder.addCase(findChapterThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findChapterThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.detailchapter = actions.payload.data.data;
    });
    builder.addCase(findChapterThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // create
    builder.addCase(createChapterThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createChapterThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.chapters = actions.payload.data.data;
    });
    builder.addCase(createChapterThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // edit
    builder.addCase(editChapterThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editChapterThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.chapters = actions.payload.data.data;
    });
    builder.addCase(editChapterThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // delete
    builder.addCase(deleteChapterThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteChapterThunk.fulfilled, (state, actions) => {
      state.loading = false;

      state.chapters = actions.payload.data.data;
    });
    builder.addCase(deleteChapterThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });
  },
});

export const {} = chapterSlice.actions;
export default chapterSlice.reducer;
