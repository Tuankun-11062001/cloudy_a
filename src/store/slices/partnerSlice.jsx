import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { partnerApi } from "../../api/partnerApi";

const initialState = {
  partners: [],
  loading: true,
  error: "",
};

export const getPartnerThunk = createAsyncThunk("partner/get", async () => {
  const res = await partnerApi.getAllPartner();
  return res;
});

export const createPartnerThunk = createAsyncThunk(
  "partner/create",
  async (data) => {
    const res = await partnerApi.createPartner(data);
    return res;
  }
);

export const deletePartnerThunk = createAsyncThunk(
  "partner/delete",
  async (data) => {
    const res = await partnerApi.deletePartner(data);
    return res;
  }
);

export const partnerSlice = createSlice({
  name: "partners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get
    builder.addCase(getPartnerThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPartnerThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.partners = actions.payload.data.data;
    });
    builder.addCase(getPartnerThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // create
    builder.addCase(createPartnerThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPartnerThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.partners = actions.payload.data.data;
    });
    builder.addCase(createPartnerThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // delete
    builder.addCase(deletePartnerThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePartnerThunk.fulfilled, (state, actions) => {
      state.loading = false;

      state.partners = actions.payload.data.data;
    });
    builder.addCase(deletePartnerThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });
  },
});

export const {} = partnerSlice.actions;
export default partnerSlice.reducer;
