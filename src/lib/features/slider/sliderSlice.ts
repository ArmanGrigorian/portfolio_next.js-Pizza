import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

const initialState: sliderState = {
	isMouseDown: false,
	startX: 0,
	scrollLeft: 0,
	mouseMoveX: 0,
};

export const sliderSlice = createSlice({
	name: "slider",

	initialState: initialState,

	reducers: {
		activateSlider: (state, { payload }: PayloadAction<activateSliderPayload>) => {
			const { startX, scrollLeft } = payload;
			state.isMouseDown = true;
			state.startX = startX;
			state.scrollLeft = scrollLeft;
			state.mouseMoveX = 0;
		},
		moveSlider: (state, { payload }: PayloadAction<number>) => {
			if (!state.isMouseDown) return;
			state.mouseMoveX = payload;
		},
		setIsMouseDown: (state, { payload }: PayloadAction<boolean>) => {
			state.isMouseDown = payload;
		},
	},
});

export const { setIsMouseDown, activateSlider, moveSlider } = sliderSlice.actions;

export const selectSlider = (state: RootState) => state.slider;

export default sliderSlice.reducer;
