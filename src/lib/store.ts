import { configureStore } from "@reduxjs/toolkit";
import sliderReducer from "./features/slider/sliderSlice";
import productsReducer from "./features/products/productsSlice";

export const makeStore = () => {
	return configureStore({
		reducer: {
			products: productsReducer,
			slider: sliderReducer,
		},
	});
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
