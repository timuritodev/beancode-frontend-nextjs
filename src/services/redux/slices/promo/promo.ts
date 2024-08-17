import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPromo, IPromoState } from "../../../../types/Promo.types";
import { fetchPromo } from "./promoAPI";

export const promoApi = createAsyncThunk(
  "@@promo/apply",
  async (data: IPromo, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetchPromo(data);
      const json = await response.json();
      return fulfillWithValue(json);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

const initialState: IPromoState = {
  status: "idle",
  error: null,
  data: {
    promo: "",
    userId: 0,
  },
};

const promoSlice = createSlice({
  name: "@@promo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(promoApi.fulfilled, (state) => {
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

export const promoReducer = promoSlice.reducer;
