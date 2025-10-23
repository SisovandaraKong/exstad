import { activityApi } from "@/components/program/detail-program/activity/activityApi";
import { curriculumApi } from "@/components/program/detail-program/curriculum/curriculumApi";
import { faqApi } from "@/components/program/detail-program/faq/faqApi";
import { learningOutcomesApi } from "@/components/program/detail-program/outcomes/learningOutcomesApi";
import { masterprogramApi } from "@/components/program/masterProgramApi";
import { programOverviewsApi } from "@/components/program/detail-program/overview/programOverviewApi";
import { requiementApi } from "@/components/program/detail-program/requirement/requirementsApi";
import { enrollmentApi } from "@/features/enrollment/enrollmentApi";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { openingProgramApi } from "@/components/program/openingProgramApi";
import { timeLineApi } from "@/components/program/detail-program/timeline/timeLineApi";
import { documentApi } from "@/features/document/documentApi";
import { telegramApi } from "@/features/telegram/telegramApi";
import { bakongApi } from "@/features/bakong/BakongApi";
import { classApi } from "@/features/class/classApi";
// import { bakongKHQRApi } from "@/features/bakong/BakongKHQRApi";
import { scholarApi } from "@/features/scholar/scholarApi";
const rootReducer = combineReducers({
  [masterprogramApi.reducerPath]: masterprogramApi.reducer,
  [openingProgramApi.reducerPath]: openingProgramApi.reducer,
  [programOverviewsApi.reducerPath]: programOverviewsApi.reducer,
  [learningOutcomesApi.reducerPath]: learningOutcomesApi.reducer,
  [requiementApi.reducerPath]: requiementApi.reducer,
  [faqApi.reducerPath]: faqApi.reducer,
  [curriculumApi.reducerPath]: curriculumApi.reducer,
  [activityApi.reducerPath]: activityApi.reducer,
  [enrollmentApi.reducerPath]: enrollmentApi.reducer,
  [documentApi.reducerPath]: documentApi.reducer,
  [telegramApi.reducerPath]: telegramApi.reducer,
  [bakongApi.reducerPath]: bakongApi.reducer,
  [classApi.reducerPath]: classApi.reducer,
  // [bakongKHQRApi.reducerPath]: bakongKHQRApi.reducer,
  [scholarApi.reducerPath]: scholarApi.reducer,
  [timeLineApi.reducerPath]: timeLineApi.reducer,
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
        enrollmentApi.middleware,
        documentApi.middleware,
        telegramApi.middleware,
        bakongApi.middleware,
        classApi.middleware,
        // bakongKHQRApi.middleware,
        scholarApi.middleware,
        timeLineApi.middleware
      ),
  });

  const persistor = persistStore(store);
  return { store, persistor };
};

export type AppStore = ReturnType<typeof makeStore>["store"];
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
