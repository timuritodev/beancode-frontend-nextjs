import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAuthDelivery, fetchDeliver2 } from "./deliveryAPI";
import {
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

export interface IDeliveryState {
  status: "idle" | "success" | "loading" | "failed";
  error: unknown;
  data: IDeliverDataRes;
}

const initialState: IDeliveryState = {
  status: "idle",
  error: null,
  data: {
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
        state.data = action.payload;
      })
      .addCase(authDeliverApi.fulfilled, (state, action) => {
        state.status = "success";
        state.data.token = action.payload.access_token;
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

export const deliverReducer = deliverSlice.reducer;
