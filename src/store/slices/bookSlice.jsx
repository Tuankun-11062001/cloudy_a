import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bookApi } from "../../api/bookApi";

const initialState = {
  books: [],
  chapters: [],
  detailBooks: {},
  loading: true,
  error: "",
};

export const getBooksThunk = createAsyncThunk("books/get", async (query) => {
  const res = await bookApi.getAllBook(query);
  return res;
});

export const findBooksThunk = createAsyncThunk("books/getOne", async (id) => {
  const res = await bookApi.findBook(id);
  return res;
});

export const createBooksThunk = createAsyncThunk(
  "books/create",
  async (data) => {
    const res = await bookApi.createBook(data);
    return res;
  }
);

export const editBooksThunk = createAsyncThunk("books/edit", async (data) => {
  const res = await bookApi.editBook(data);
  return res;
});

export const deleteBooksThunk = createAsyncThunk(
  "books/delete",
  async (data) => {
    const res = await bookApi.deleteBook(data);
    return res;
  }
);

export const BooksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get lyrics
    builder.addCase(getBooksThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBooksThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.books = actions.payload.data.data;
    });
    builder.addCase(getBooksThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // get lyrics one
    builder.addCase(findBooksThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findBooksThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.detailBooks = actions.payload.data.data;
    });
    builder.addCase(findBooksThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // create
    builder.addCase(createBooksThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBooksThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.books = actions.payload.data.data;
    });
    builder.addCase(createBooksThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // edit
    builder.addCase(editBooksThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editBooksThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.books = actions.payload.data.data;
    });
    builder.addCase(editBooksThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // delete
    builder.addCase(deleteBooksThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteBooksThunk.fulfilled, (state, actions) => {
      state.loading = false;

      state.books = actions.payload.data.data;
    });
    builder.addCase(deleteBooksThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });
  },
});

export const {} = BooksSlice.actions;
export default BooksSlice.reducer;
