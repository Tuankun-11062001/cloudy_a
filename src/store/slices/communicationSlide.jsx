import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { communicationApi } from "../../api/communicationApi";

const initialState = {
  communications: [],
  loading: true,
  error: "",
};

export const getCommunicationThunk = createAsyncThunk(
  "communications",
  async () => {
    const res = await communicationApi.getAllCommunication();
    return res;
  }
);

export const createCommunicationThunk = createAsyncThunk(
  "communications/create",
  async (data) => {
    const res = await communicationApi.createCommunication(data);
    return res;
  }
);

export const updateCommunicationThunk = createAsyncThunk(
  "communication/update",
  async (data) => {
    const res = await communicationApi.updateCommunication(data);
    return res;
  }
);

export const deleteCommunicationThunk = createAsyncThunk(
  "communication/delete",
  async (id) => {
    const res = await communicationApi.deleteCommunication(id);
    return res;
  }
);

export const communicationSlice = createSlice({
  name: "communication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCommunicationThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCommunicationThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.communications = actions.payload.data.data;
    });
    builder.addCase(getCommunicationThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // create
    builder.addCase(createCommunicationThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCommunicationThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.communications = actions.payload.data.data;
    });
    builder.addCase(createCommunicationThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // update
    builder.addCase(updateCommunicationThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCommunicationThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.communications = actions.payload.data.data;
    });
    builder.addCase(updateCommunicationThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // delete
    builder.addCase(deleteCommunicationThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCommunicationThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.communications = actions.payload.data.data;
    });
    builder.addCase(deleteCommunicationThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });
  },
});

export const {} = communicationSlice.actions;
export default communicationSlice.reducer;
