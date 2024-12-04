import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supportApi } from "../../api/supportApi";

const initialState = {
  supports: [],
  loading: true,
  error: "",
};

export const getSupportsThunk = createAsyncThunk("support/get", async () => {
  const res = await supportApi.getAllSupport();
  return res;
});

export const createSupportThunk = createAsyncThunk(
  "support/create",
  async (data) => {
    const res = await supportApi.createSupport(data);
    return res;
  }
);

export const editSupportThunk = createAsyncThunk(
  "support/edit",
  async (data) => {
    const res = await supportApi.editSupport(data);
    return res;
  }
);

// export const deletePartnerThunk = createAsyncThunk(
//   "profile/delete",
//   async (data) => {
//     const res = await supportApi.deletePartner(data);
//     return res;
//   }
// );

export const supportSlice = createSlice({
  name: "support",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get
    builder.addCase(getSupportsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSupportsThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.supports = actions.payload.data.data;
    });
    builder.addCase(getSupportsThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // create
    builder.addCase(createSupportThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createSupportThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.supports = actions.payload.data.data;
    });
    builder.addCase(createSupportThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });
    // Edit
    builder.addCase(editSupportThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editSupportThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.supports = actions.payload.data.data;
    });
    builder.addCase(editSupportThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });
  },
});

export const {} = supportSlice.actions;
export default supportSlice.reducer;
