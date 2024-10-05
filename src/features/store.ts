import { configureStore } from "@reduxjs/toolkit";
import { randomPhotosApi } from "./feature/random-photos-api";
import { userPhotoApi } from "./feature/user-photos-api";
import { accountApi } from "./feature/account-api";

const store = configureStore({
  // reducer
  reducer: {
    [randomPhotosApi.reducerPath]: randomPhotosApi.reducer,
    [userPhotoApi.reducerPath]: userPhotoApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
  },

  // middleware

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({}).concat([
      randomPhotosApi.middleware,
      userPhotoApi.middleware,
      accountApi.middleware,
    ]);
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
