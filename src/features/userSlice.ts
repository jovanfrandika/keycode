import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fromApi, JWTKeyname } from "../axios";
import { reduxStatus } from "../constants/reduxTypes";

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }: any) => {
    const data = await fromApi.login(email, password);
    await localStorage.setItem(JWTKeyname, data.jwt);
    return data;
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  const data = await fromApi.logout();
  await localStorage.removeItem(JWTKeyname);
  return data;
});

export const register = createAsyncThunk(
  "user/register",
  async ({ email, username, password }: any) => {
    const data = await fromApi.register(email, username, password);
    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    email: "",
    status: reduxStatus.idle,
  },
  reducers: {},
  extraReducers: {
    [login.pending as any]: (state, action: any) => {
      state.status = `login/${reduxStatus.loading}`;
    },
    [register.pending as any]: (state, action: any) => {
      state.status = `register/${reduxStatus.loading}`;
    },
    [logout.pending as any]: (state, action: any) => {
      state.status = `logout/${reduxStatus.loading}`;
    },
    [login.fulfilled as any]: (state, action: any) => {
      const { id, email } = action.payload;
      state.id = id;
      state.email = email;

      state.status = `login/${reduxStatus.success}`;
    },
    [register.fulfilled as any]: (state, action: any) => {
      state.status = `register/${reduxStatus.success}`;
    },
    [logout.fulfilled as any]: (state, action: any) => {
      const { id, email } = action.payload;
      state.id = id;
      state.email = email;

      state.status = `logout/${reduxStatus.success}`;
    },
    [login.rejected as any]: (state, action: any) => {
      state.status = `login/${reduxStatus.error}`;
    },
    [register.rejected as any]: (state, action: any) => {
      state.status = `register/${reduxStatus.error}`;
    },
    [logout.rejected as any]: (state, action: any) => {
      state.status = `logout/${reduxStatus.error}`;
    },
  },
});

export const selectUser = (state: any) => {
  return {
    id: state.user.id,
    email: state.user.email,
  };
};

export const selectUserStatus = (state: any) => {
  return {
    status: String(state.user.status),
  };
};
export default userSlice.reducer;
