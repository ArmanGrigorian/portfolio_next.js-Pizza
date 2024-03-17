import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import productsReducer from "./features/products/productsSlice";
import sliderReducer from "./features/slider/sliderSlice";

export const makeStore = () => {
	return configureStore({
		reducer: {
			products: productsReducer,
			slider: sliderReducer,
		},
	});
};

const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
setupListeners(store.dispatch);
