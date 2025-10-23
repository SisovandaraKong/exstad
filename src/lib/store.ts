import { activityApi } from "@/components/program/detail-program/activity/activityApi";
import { curriculumApi } from "@/components/program/detail-program/curriculum/curriculumApi";
import { faqApi } from "@/components/program/detail-program/faq/faqApi";
import { learningOutcomesApi } from "@/components/program/detail-program/outcomes/learningOutcomesApi";
import { masterprogramApi } from "@/components/program/masterProgramApi";
import { openingProgramApi } from "@/components/program/openingProgramApi";
import { programOverviewsApi } from "@/components/program/detail-program/overview/programOverviewApi";
import { requiementApi } from "@/components/program/detail-program/requirement/requirementsApi";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { StudentApi } from "@/components/student/StudentApi";
import { scholarApi } from "@/components/scholar/scholarApi";

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
  [StudentApi.reducerPath]: StudentApi.reducer,
  [scholarApi.reducerPath]: scholarApi.reducer,
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
        StudentApi.middleware,
        scholarApi.middleware
      ),
  });

  const persistor = persistStore(store);
  return { store, persistor };
};

export type AppStore = ReturnType<typeof makeStore>["store"];
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
