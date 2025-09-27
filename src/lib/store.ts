
import { activityApi } from "@/components/programCard/activityApi";
import { curriculumApi } from "@/components/programCard/curriculumApi";
import { faqApi } from "@/components/programCard/faqApi";
import { learningOutcomesApi } from "@/components/programCard/learningOutcomesApi";
import { masterprogramApi } from "@/components/programCard/masterProgramApi";
import { openingProgramApi } from "@/components/programCard/openingProgramApi";
import { programOverviewsApi } from "@/components/programCard/programOverviewApi";
import { requiementApi } from "@/components/programCard/requirementsApi";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    [masterprogramApi.reducerPath]: masterprogramApi.reducer,
    [openingProgramApi.reducerPath]: openingProgramApi.reducer,
    [programOverviewsApi.reducerPath]: programOverviewsApi.reducer,
    [learningOutcomesApi.reducerPath]: learningOutcomesApi.reducer,
    [requiementApi.reducerPath]: requiementApi.reducer,
    [faqApi.reducerPath]: faqApi.reducer,
    [curriculumApi.reducerPath]: curriculumApi.reducer,
    [activityApi.reducerPath]: activityApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  // blacklist: [currentAddressApi.reducerPath, provinceApi.reducerPath], // optional
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
          masterprogramApi.middleware,
          openingProgramApi.middleware,
          programOverviewsApi.middleware,
          learningOutcomesApi.middleware,
          requiementApi.middleware,
          faqApi.middleware,
          curriculumApi.middleware,
          activityApi.middleware,

      ),
  });

  const persistor = persistStore(store);
  return { store, persistor };
};

export type AppStore = ReturnType<typeof makeStore>["store"];
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
