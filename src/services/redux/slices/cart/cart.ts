/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAddToCart,
  fetchAddToSessionCart,
  fetchDeleteAll,
  fetchDeleteFromCart,
  fetchDeleteFromSessionCart,
  fetchDeleteSessionAll,
  fetchGetCart,
  fetchGetSessionCart,
} from "./cartAPI";
import { ICartData, ICartState, ISessionCartData } from "../../../../types/Cart.types";

export const addToCartApi = createAsyncThunk(
  "@@cart/addToCart",
  async (data: ICartData, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetchAddToCart(data);
      const json = await response.json();
      return fulfillWithValue(json);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const deleteFromCartApi = createAsyncThunk(
  "@@cart/deleteFromCart",
  async (data: ICartData, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetchDeleteFromCart(data);
      const json = await response.json();
      return fulfillWithValue(json);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const addToSessionCartApi = createAsyncThunk(
  "@@cart/addToSessionCart",
  async (data: ISessionCartData, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetchAddToSessionCart(data);
      const json = await response.json();
      return fulfillWithValue(json);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const deleteFromSessionCartApi = createAsyncThunk(
  "@@cart/deleteFromSessionCart",
  async (data: ISessionCartData, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetchDeleteFromSessionCart(data);
      const json = await response.json();
      return fulfillWithValue(json);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const deleteAllApi = createAsyncThunk(
  "@@cart/deleteAll",
  async (userId: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetchDeleteAll(userId);
      const json = await response;
      return fulfillWithValue(json);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const deleteAllSessionApi = createAsyncThunk(
  "@@cart/deleteAllSession",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetchDeleteSessionAll();
      const json = await response;
      return fulfillWithValue(json);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

// export const getCartApi = createAsyncThunk(
//   "@@cart/getCart",
//   async (userId: number, { fulfillWithValue, rejectWithValue }) => {
//     try {
//       const response = await fetchGetCart(userId);
//       // const json = await response;
//       return fulfillWithValue(response);
//     } catch (error: unknown) {
//       return rejectWithValue(error);
//     }
//   }
// );

export const getCartApi = createAsyncThunk(
  "@@cart/getCart",
  async (userId: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetchGetCart(userId);
      return fulfillWithValue(response);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const getSessionCartApi = createAsyncThunk(
  "@@cart/getSessionCart",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetchGetSessionCart();
      return fulfillWithValue(response);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

const initialState: ICartState = {
  status: "idle",
  error: null,
  cart: [],
};

const cartSlice = createSlice({
  name: "@@cart",
  initialState,
  reducers: {
    resetCart: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartApi.fulfilled, (state, action) => {
        state.status = "success";
        state.cart = [...state.cart, action.payload];
      })
      .addCase(deleteFromCartApi.fulfilled, (state, action) => {
        state.status = "success";
        const { id, price } = action.payload;
        const indexToDelete = state.cart.findIndex(
          (item) => item.id === id && item.price === price
        );
        if (indexToDelete !== -1) {
          state.cart = state.cart.filter((_, index) => index !== indexToDelete);
        }
      })
      .addCase(addToSessionCartApi.fulfilled, (state, action) => {
        state.status = "success";
        state.cart = [...state.cart, action.payload];
      })
      .addCase(deleteFromSessionCartApi.fulfilled, (state, action) => {
        state.status = "success";
        const { id, price } = action.payload;
        const indexToDelete = state.cart.findIndex(
          (item) => item.id === id && item.price === price
        );
        if (indexToDelete !== -1) {
          state.cart = state.cart.filter((_, index) => index !== indexToDelete);
        }
      })
      .addCase(deleteAllApi.fulfilled, (state) => {
        state.status = "success";
        state.cart = [];
      })
      .addCase(deleteAllSessionApi.fulfilled, (state) => {
        state.status = "success";
        state.cart = [];
      })
      .addCase(getCartApi.fulfilled, (state, action) => {
        state.status = "success";
        state.cart = action.payload;
      })
      .addCase(getSessionCartApi.fulfilled, (state, action) => {
        state.status = "success";
        state.cart = action.payload;
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

export const { resetCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
