import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCalculateDelivery, fetchAuthDelivery, fetchDeliver2 } from "./deliveryAPI";
import {
  DeliveryCalculateRequest,
  DeliveryCalculateResponse,
  IAuthDelivery,
  IDeliverDataRes,
  OrderRegistrationRequest,
} from "../../../../types/Deliver.types";

export const deliverApi = createAsyncThunk(
  "@@deliver/register",
  async (
    arg: {
      data: OrderRegistrationRequest;
      token: string;
    },
    { fulfillWithValue, rejectWithValue }
  ) => {
    const { data, token } = arg;
    try {
      const response = await fetchDeliver2(data, token);
      const json = await response.json();
      return fulfillWithValue(json);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const authDeliverApi = createAsyncThunk(
  "@@deliver/auth",
  async (data: IAuthDelivery, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetchAuthDelivery(data);
      const json = await response;
      return fulfillWithValue(json);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const calculateDeliverApi = createAsyncThunk(
  "@@deliver/calculate",
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

export interface IUnifiedState {
  status: "idle" | "success" | "loading" | "failed";
  error: unknown;
  deliveryPriceData: DeliveryCalculateResponse;
  deliveryData: IDeliverDataRes;
}

const initialState: IUnifiedState = {
  status: "idle",
  error: null,
  deliveryPriceData: {
    delivery_sum: 0,
    period_min: 0,
    period_max: 0,
    weight_calc: 0,
    calendar_min: 0,
    calendar_max: 0,
    services: [
      {
        code: "",
        sum: 0,
        total_sum: 0,
        discount_percent: 0,
        discount_sum: 0,
        vat_rate: 0,
        vat_sum: 0,
      },
    ],
    total_sum: 0,
    currency: "",
    errors: [{ code: "", message: "" }],
  },
  deliveryData: {
    token: "",
    entity: {
      uuid: "",
    },
    requests: [
      {
        request_uuid: "",
        type: "",
        state: "",
        date_time: "",
        errors: [],
        warnings: [],
      },
    ],
  },
};

const deliverSlice = createSlice({
  name: "@@deliver",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deliverApi.fulfilled, (state, action) => {
        state.status = "success";
        state.deliveryData = action.payload;
      })
      .addCase(authDeliverApi.fulfilled, (state, action) => {
        state.status = "success";
        state.deliveryData.token = action.payload.access_token;
      })
      .addCase(calculateDeliverApi.fulfilled, (state, action) => {
        state.status = "success";
        state.deliveryPriceData = action.payload;
      })
      // .addMatcher(
      //   (action) => action.type.endsWith("/rejected"),
      //   (state, action) => {
      //     state.status = "failed";
      //     state.error = action.payload.statusText;
      //   }
      // );
  },
});

export const deliverReducer = deliverSlice.reducer;
