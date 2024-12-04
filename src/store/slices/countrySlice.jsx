import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { countryApi } from "../../api/countryApi";

const initialState = {
  country: [],
  loading: true,
  error: "",
};

export const getCountryThunk = createAsyncThunk("country/get", async () => {
  const res = await countryApi.getAllCountry();
  return res;
});

export const createCountryThunk = createAsyncThunk(
  "country/create",
  async (data) => {
    const res = await countryApi.createCountry(data);
    return res;
  }
);

export const deleteCountryThunk = createAsyncThunk(
  "country/delete",
  async (data) => {
    const res = await countryApi.deleteCountry(data);
    return res;
  }
);

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get country
    builder.addCase(getCountryThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCountryThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.country = actions.payload.data.data;
    });
    builder.addCase(getCountryThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // create
    builder.addCase(createCountryThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCountryThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.country = actions.payload.data.data;
    });
    builder.addCase(createCountryThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // delete
    builder.addCase(deleteCountryThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCountryThunk.fulfilled, (state, actions) => {
      state.loading = false;

      state.country = actions.payload.data.data;
    });
    builder.addCase(deleteCountryThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });
  },
});

export const {} = countrySlice.actions;
export default countrySlice.reducer;
