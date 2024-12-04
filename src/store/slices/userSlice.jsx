import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userApi } from "../../api/userApi";

const initialState = {
  users: [],
  loading: true,
  error: "",
};

export const getUserThunk = createAsyncThunk("user/get", async () => {
  const res = await userApi.getAllUser();
  return res;
});

export const createUserThunk = createAsyncThunk("user/create", async (data) => {
  const res = await userApi.createUser(data);
  return res;
});

export const editUserThunk = createAsyncThunk("user/edit", async (data) => {
  const res = await userApi.editUser(data);
  return res;
});

export const deleteUserThunk = createAsyncThunk("user/delete", async (data) => {
  const res = await userApi.deleteUser(data);
  return res;
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get
    builder.addCase(getUserThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.users = actions.payload.data.data;
    });
    builder.addCase(getUserThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // create
    builder.addCase(createUserThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createUserThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.users = actions.payload.data.data;
    });
    builder.addCase(createUserThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // edit
    builder.addCase(editUserThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editUserThunk.fulfilled, (state, actions) => {
      state.loading = false;
      state.users = actions.payload.data.data;
    });
    builder.addCase(editUserThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // delete
    builder.addCase(deleteUserThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUserThunk.fulfilled, (state, actions) => {
      state.loading = false;

      state.users = actions.payload.data.data;
    });
    builder.addCase(deleteUserThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
