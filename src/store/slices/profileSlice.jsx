import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { profileApi } from "../../api/profileApi";

const initialState = {
  profiles: [],
  loading: true,
  error: "",
};

export const getProfilesThunk = createAsyncThunk("profile/get", async () => {
  const res = await profileApi.getAllProfile();
  return res;
});

export const createProfileThunk = createAsyncThunk(
  "profile/create",
  async (data) => {
    const res = await profileApi.createProfile(data);
    return res;
  }
);

export const editProfileThunk = createAsyncThunk(
  "profile/edit",
  async (data) => {
    const res = await profileApi.editProfile(data);
    return res;
  }
);

// export const deletePartnerThunk = createAsyncThunk(
//   "profile/delete",
//   async (data) => {
//     const res = await profileApi.deletePartner(data);
//     return res;
//   }
// );

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get
    builder.addCase(getProfilesThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProfilesThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.profiles = actions.payload.data.data;
    });
    builder.addCase(getProfilesThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // create
    builder.addCase(createProfileThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProfileThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.profiles = actions.payload.data.data;
    });
    builder.addCase(createProfileThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });
    // Edit
    builder.addCase(editProfileThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editProfileThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.profiles = actions.payload.data.data;
    });
    builder.addCase(editProfileThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });
  },
});

export const {} = profileSlice.actions;
export default profileSlice.reducer;
