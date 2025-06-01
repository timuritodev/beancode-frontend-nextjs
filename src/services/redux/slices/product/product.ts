import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductbyid, getProducts } from "./productAPI";
import { IProductState } from "../../../../types/Product.types";

// export const getProductsApi = createAsyncThunk('@@movies/getMovies', async () => {
// 	return getProducts();
// });

export const getProductsApi = createAsyncThunk(
  "@@product/get",
  async (__, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await getProducts();
      return fulfillWithValue(response);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const getProductbyidApi = createAsyncThunk(
  "@@product/getById",
  async (productId: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await getProductbyid(productId);
      const json = await response;
      return fulfillWithValue(json);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

const initialState: IProductState = {
  status: "idle",
  error: "",
  products: [
    {
      id: 0,
      title: "",
      description: "",
      price: "",
      weight: "",
      h_picture: "",
      v_picture: "",
      acidity: 0,
      density: 0,
      big_description: "",
      low_price: "",
      low_weight: "",
      country: "",
    },
  ],
  product: {
    id: 0,
    title: "",
    description: "",
    price: "",
    weight: "",
    h_picture: "",
    v_picture: "",
    acidity: 0,
    density: 0,
    big_description: "",
    low_price: "",
    low_weight: "",
    country: "",
    additional_pictures: [],
  },
};

export const productSlice = createSlice({
  name: "@@products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsApi.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
    builder
      .addCase(getProductbyidApi.fulfilled, (state, action) => {
        state.status = "success";
        state.product = action.payload;
      })
      .addCase(getProductbyidApi.pending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload.statusText;
        }
      )

    // .addMatcher(
    //   (action) => action.type.endsWith("/rejected"),
    //   (state, action) => {
    //     state.status = "failed";
    //     state.error = action.payload.statusText;
    //   }
    // );
  },
});

export const productReducer = productSlice.reducer;
