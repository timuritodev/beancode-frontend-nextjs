import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCalculateDelivery } from "./deliveryPriceAPI";
import {
  DeliveryCalculateRequest,
  DeliveryCalculateResponse,
} from "../../../../types/Deliver.types";

export const calculateDeliverApi = createAsyncThunk(
  "@@deliverPrice/calculate",
  async (
    arg: {
      data: DeliveryCalculateRequest;
      token: string;
    },
    { fulfillWithValue, rejectWithValue }
  ) => {
    const { data, token } = arg;
    try {
      const response = await fetchCalculateDelivery(data, token);
      const json = await response.json();
      return fulfillWithValue(json);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export interface IDeliveryPriceState {
  status: "idle" | "success" | "loading" | "failed";
  error: unknown;
  data: DeliveryCalculateResponse;
}

const initialState: IDeliveryPriceState = {
  status: "idle",
  error: null,
  data: {
    delivery_sum: 0,
    period_min: 0,
    period_max: 0,
    weight_calc: 0,
    calendar_min: 0,
    calendar_max: 0,
    services: [{
      code: '',
      sum: 0,
      total_sum: 0,
      discount_percent: 0,
      discount_sum: 0,
      vat_rate: 0,
      vat_sum: 0,
    }],
    total_sum: 0,
    currency: '',
    errors: [{
      code: '',
      message: ''
    }]
  },
};

const deliverPriceSlice = createSlice({
  name: "@@deliverPrice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(calculateDeliverApi.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
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

export const deliverPriceReducer = deliverPriceSlice.reducer;
