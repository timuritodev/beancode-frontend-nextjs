import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISubcription, ISubcriptionState } from "../../../../types/Subcription.types";
import { fetchSubcribe } from "./subscriptionAPI";

export const subcribeApi = createAsyncThunk(
  "@@subcribe/add",
  async (email: ISubcription, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetchSubcribe(email);
      const json = await response.json();
      return fulfillWithValue(json);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

const initialState: ISubcriptionState = {
  status: "idle",
  error: null,
  data: {
    email: "",
  },
};

const subcriptionSlice = createSlice({
  name: "@@subcription",
  initialState,
  reducers: {
    setSubcription: (state, action) => {
      state.data = action.payload;
    },
    signOut: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(subcribeApi.fulfilled, (state) => {
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

export const { signOut } = subcriptionSlice.actions;

export const subcriptionReducer = subcriptionSlice.reducer;
