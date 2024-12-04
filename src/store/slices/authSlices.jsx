import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../api/authApi";

const initialState = {
  user: {},
  loading: true,
  error: "",
};

export const loginThunk = createAsyncThunk("auth/login", async (data) => {
  const res = await authApi.login(data);
  return res;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkUser: (state, actions) => {
      state.user = actions.payload.data.data;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginThunk.fulfilled, (state, actions) => {
      if (actions.payload.status === 401) {
        state.error = actions.payload.response.data.message;
      } else {
        state.user = actions.payload.data.data;
        localStorage.setItem("_CM_id", actions.payload.data.data._id);
        state.error = null; // Đặt lại lỗi nếu thành công
      }
      state.loading = false; // Đặt loading thành false khi hoàn thành
    });
    builder.addCase(loginThunk.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });
  },
});

export const { checkUser } = authSlice.actions;
export default authSlice.reducer;
