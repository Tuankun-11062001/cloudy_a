import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { adsApi } from "../../api/adsApi";

const initialState = {
  ads: [],
  loading: true,
  error: "",
};

export const getAdsThunk = createAsyncThunk("ads/get", async () => {
  const res = await adsApi.getAllAds();
  return res;
});

export const createAdsThunk = createAsyncThunk("ads/create", async (data) => {
  const res = await adsApi.createAds(data);
  return res;
});

export const editAdsThunk = createAsyncThunk("ads/edit", async (data) => {
  const res = await adsApi.editAds(data);
  return res;
});

export const deleteAdsThunk = createAsyncThunk("ads/delete", async (data) => {
  const res = await adsApi.deleteAds(data);
  return res;
});

export const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get
    builder.addCase(getAdsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAdsThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.ads = actions.payload.data.data;
    });
    builder.addCase(getAdsThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // create
    builder.addCase(createAdsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAdsThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.ads = actions.payload.data.data;
    });
    builder.addCase(createAdsThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // edit
    builder.addCase(editAdsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editAdsThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.ads = actions.payload.data.data;
    });
    builder.addCase(editAdsThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // delete
    builder.addCase(deleteAdsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAdsThunk.fulfilled, (state, actions) => {
      state.loading = false;

      state.ads = actions.payload.data.data;
    });
    builder.addCase(deleteAdsThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });
  },
});

export const {} = adsSlice.actions;
export default adsSlice.reducer;
