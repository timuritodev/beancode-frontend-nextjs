import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  PERSIST,
  REHYDRATE,
  FLUSH,
  PAUSE,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { userReducer } from './slices/user/user';
import { productReducer } from './slices/product/product';
import { productbyidReducer } from './slices/productbyid/productbyid';
import { cartReducer } from './slices/cart/cart';
import { orderReducer } from './slices/order/order';
import { payReducer } from './slices/pay/pay';
import { orderStatusReducer } from './slices/orderStatus/orderStatus';
import { wholesaleReducer } from './slices/wholesale/wholesale';
import { promoReducer } from './slices/promo/promo';
import { deliverReducer } from './slices/delivery/delivery';
import { deliverPriceReducer } from './slices/deliveryPrice/deliveryPrice';

const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
  productbyid: productbyidReducer,
  cart: cartReducer,
  order: orderReducer,
  pay: payReducer,
  orderStatus: orderStatusReducer,
  wholesale: wholesaleReducer,
  promo: promoReducer,
  deliver: deliverReducer,
  deliverPrice: deliverPriceReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, REHYDRATE, FLUSH, PAUSE, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
