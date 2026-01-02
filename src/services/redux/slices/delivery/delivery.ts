import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCalculateDelivery, fetchAuthDelivery, fetchDeliver2, fetchCountries } from "./deliveryAPI";
import {
  DeliveryCalculateRequest,
  DeliveryCalculateResponse,
  IAuthDelivery,
  IAuthDeliveryResponse,
  IDeliverDataRes,
  IDeliveryCountries,
  IDeliveryCountriesResponse,
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

export const getCountriesApi = createAsyncThunk(
  "@@deliver/countries",
  async (
    arg: {
      data: IDeliveryCountries;
      token: string;
    },
    { fulfillWithValue, rejectWithValue }
  ) => {
    const { data, token } = arg;
    try {
      const response = await fetchCountries(data, token);
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
  deliveryCountries: IDeliveryCountriesResponse[];
  deliveryToken: IAuthDeliveryResponse;
  tokenExpiryTime: number; // Время истечения токена в формате UNIX timestamp
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
  deliveryCountries: [{
    code: 0,
    city: '',
    fias_guid: '',
    city_uuid: '',
    kladr_code: '',
    country_code: '',
    country: '',
    region: '',
    region_code: 0,
    fias_region_guid: '',
    kladr_region_code: '',
    sub_region: '',
    postal_eodes: [''],
    longitude: 0,
    latitude: 0,
    time_zone: '',
    payment_limit: 0,
    errors: [{ code: "", message: "" }],
  }],
  deliveryToken: {
    access_token: '',
    expires_in: 0,
    token_type: '',
    scope: '',
    jti: '',
  },
  tokenExpiryTime: 0, // Время истечения токена (0 означает, что токен не установлен)
};

const deliverSlice = createSlice({
  name: "@@deliver",
  initialState,
  reducers: {
    resetDeliveryData: (state) => {
      state.deliveryData = initialState.deliveryData;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deliverApi.fulfilled, (state, action) => {
        state.status = "success";
        state.deliveryData = action.payload;
      })
      .addCase(authDeliverApi.fulfilled, (state, action) => {
        state.status = "success";
        // state.deliveryData.token = action.payload.access_token;
        state.deliveryToken = action.payload;
        // Сохраняем время истечения токена (текущее время + expires_in в секундах)
        state.tokenExpiryTime = Math.floor(Date.now() / 1000) + action.payload.expires_in;
      })
      .addCase(calculateDeliverApi.fulfilled, (state, action) => {
        state.status = "success";
        state.deliveryPriceData = action.payload;
      })
      .addCase(getCountriesApi.fulfilled, (state, action) => {
        state.status = "success";
        state.deliveryCountries = action.payload;
      })
      .addCase(calculateDeliverApi.pending, (state) => {
				state.status = 'loading';
			})
      .addCase(getCountriesApi.pending, (state) => {
				state.status = 'loading';
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

export const { resetDeliveryData } = deliverSlice.actions;
export const deliverReducer = deliverSlice.reducer;
