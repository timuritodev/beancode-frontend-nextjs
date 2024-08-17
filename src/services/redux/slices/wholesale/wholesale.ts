import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCreateWholesale } from "./wholesaleAPI";
import { IWholesale, IWholesaleState } from "../../../../types/Wholesale.types";

export const createWholesaleApi = createAsyncThunk(
  "@@wholesale/createwholesale",
  async (data: IWholesale, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetchCreateWholesale(data);
      const json = await response.json();
      return fulfillWithValue(json);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

const initialState: IWholesaleState = {
  status: "idle",
  error: null,
  data: [],
};

const wholesaleSlice = createSlice({
  name: "@@wholesale",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createWholesaleApi.fulfilled, (state, action) => {
        state.status = "success";
        // state.data = [...state.data, action.payload];
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

export const wholesaleReducer = wholesaleSlice.reducer;
