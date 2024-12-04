import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { eventApi } from "../../api/eventApi";

const initialState = {
  events: [],
  loading: true,
  error: "",
};

export const getEventThunk = createAsyncThunk("event/get", async () => {
  const res = await eventApi.getAllEvent();
  return res;
});

export const createEventThunk = createAsyncThunk(
  "event/create",
  async (data) => {
    const res = await eventApi.createEvent(data);
    return res;
  }
);

export const editEventThunk = createAsyncThunk("event/edit", async (data) => {
  const res = await eventApi.editEvent(data);
  return res;
});

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get
    builder.addCase(getEventThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getEventThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.events = actions.payload.data.data;
    });
    builder.addCase(getEventThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // create
    builder.addCase(createEventThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createEventThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.events = actions.payload.data.data;
    });
    builder.addCase(createEventThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // edit
    builder.addCase(editEventThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editEventThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.events = actions.payload.data.data;
    });
    builder.addCase(editEventThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });
  },
});

export const {} = eventSlice.actions;
export default eventSlice.reducer;
