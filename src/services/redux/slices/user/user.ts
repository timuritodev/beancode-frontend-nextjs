/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchSignUp,
  fetchSignIn,
  fetchGetUserInfo,
  fetchEditUserInfo,
  fetchChangePassword,
  fetchRecoverPassword,
  fetchResetPassword,
} from "./userApi";
import {
  IUser,
  ISignInData,
  ISignUpData,
  IEditProfileData,
  IChangePassword,
  IRecoverPassword,
  IResetPassword,
} from "../../../../types/Auth.types";

export interface IUserState {
  status: "idle" | "success" | "loading" | "failed";
  error: unknown;
  user: IUser;
}

export const signInUser = createAsyncThunk(
  "@@user/signIn",
  async (data: ISignInData, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetchSignIn(data);
      const json = await response.json();
      return fulfillWithValue(json);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const signUpUser = createAsyncThunk(
  "@@user/signUp",
  async (data: ISignUpData, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetchSignUp(data);
      const json = await response.json();
      return fulfillWithValue(json);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "@@user/getUserInfo",
  async (token: string, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetchGetUserInfo(token);
      const json = await response.json();
      return fulfillWithValue(json);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const editUserInfo = createAsyncThunk(
  "@@user/editUserInfo",
  async (
    arg: {
      data: IEditProfileData;
      token: string;
    },
    { fulfillWithValue, rejectWithValue }
  ) => {
    const { data, token } = arg;
    try {
      const response = await fetchEditUserInfo(data, token);
      const json = await response.json();
      return fulfillWithValue(json);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const changePassword = createAsyncThunk(
  "@@user/changePassword",
  async (
    arg: {
      data: IChangePassword;
      token: string;
    },
    { fulfillWithValue, rejectWithValue }
  ) => {
    const { data, token } = arg;
    try {
      const response = await fetchChangePassword(data, token);
      const json = await response.json();
      return fulfillWithValue(json);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const recoverPassword = createAsyncThunk(
  "@@user/recoverPassword",
  async (email: IRecoverPassword, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetchRecoverPassword(email);
      const json = await response.json();
      return fulfillWithValue(json);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "@@user/resetPassword",
  async (data: IResetPassword, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetchResetPassword(data);
      const json = await response.json();
      return fulfillWithValue(json);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

const initialState: IUserState = {
  status: "idle",
  error: null,
  user: {
    id: 0,
    name: "",
    surname: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    city: "",
    area: "",
    token: "",
  },
};

const userSlice = createSlice({
  name: "@@user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    signOut: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = "success";
        state.user.token = action.payload;
      })
      .addCase(signUpUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = "success";
        state.user.token = action.payload;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.status = "success";
        state.user.id = action.payload.user.id;
        state.user.name = action.payload.user.name;
        state.user.surname = action.payload.user.surname;
        state.user.phone = action.payload.user.phone;
        state.user.email = action.payload.user.email;
        state.user.address = action.payload.user.address;
        state.user.city = action.payload.user.city;
        state.user.area = action.payload.user.area;
      })
      .addCase(editUserInfo.fulfilled, (state, action) => {
        state.status = "success";
        state.user.name = action.payload.user.name;
        state.user.surname = action.payload.user.surname;
        state.user.phone = action.payload.user.phone;
        state.user.email = action.payload.user.email;
        state.user.address = action.payload.user.address;
        state.user.city = action.payload.user.city;
        state.user.area = action.payload.user.area;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(recoverPassword.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload.statusText;
        }
      );
  },
});

export const { setUser, signOut } = userSlice.actions;

export const userReducer = userSlice.reducer;

export const selectUser = (state: { user: IUserState }) => state.user.user;
export const selectUserStatus = (state: { user: IUserState }) =>
  state.user.status;
