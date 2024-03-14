import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import productsReducer from "./features/products/productsSlice";
import sliderReducer from "./features/slider/sliderSlice";
import { productsApi } from "./services/productsApi";

export const makeStore = () => {
	return configureStore({
		reducer: {
			products: productsReducer,
			slider: sliderReducer,
			[productsApi.reducerPath]: productsApi.reducer,
		},
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware),
	});
};

const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
setupListeners(store.dispatch);
