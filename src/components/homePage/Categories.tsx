"use client";
import {
	selectProducts,
	setActiveCategory,
	setMenuProducts,
} from "@/lib/features/products/productsSlice";
import {
	activateSlider,
	moveSlider,
	selectSlider,
	setIsMouseDown,
} from "@/lib/features/slider/sliderSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useGetPokemonByNameQuery } from "@/lib/services/products";
import { getEventPageX } from "@/utils/helpers";
import { useEffect, useMemo, useRef } from "react";
import { LOCAL_DATA } from "../../../DATA";

export default function Categories() {
	const ulRef = useRef<HTMLUListElement>(null);

	const dispatch = useAppDispatch();
	const { menuProducts, activeCategory, activeSort } = useAppSelector(selectProducts);
	const { scrollLeft, mouseMoveX, startX, isMouseDown } = useAppSelector(selectSlider);
	const { data, isLoading, isSuccess, isError } = useGetPokemonByNameQuery({
		activeCategory,
		activeSort,
	});

	const categoriesData = useMemo(() => {
		return ["All", ...Array.from(new Set(menuProducts.flatMap((pizza) => pizza.categories)))];
	}, [menuProducts]);

	useEffect(() => {
		if (!ulRef.current) return;
		ulRef.current.scrollLeft = scrollLeft - mouseMoveX;
	}, [mouseMoveX, scrollLeft]);

	useEffect(() => {
		if (isLoading) {
			dispatch(setMenuProducts(LOCAL_DATA));
		} else if (isSuccess) {
			dispatch(setMenuProducts(data));
		} else {
			dispatch(setMenuProducts(LOCAL_DATA));
		}
	}, [data, dispatch, isLoading, isSuccess]);

	function handleMouseDown(e: MouseTouchEvent<HTMLUListElement>) {
		if (!ulRef.current) return;
		if (e.type === "touchstart") e.preventDefault();

		const scrollLeft = ulRef.current.scrollLeft;
		const startX = getEventPageX(e) - ulRef.current.offsetLeft;

		dispatch(activateSlider({ startX, scrollLeft }));
	}

	function handleMouseMove(e: MouseTouchEvent<HTMLUListElement>) {
		if (!ulRef.current || !isMouseDown) return;
		if (e.type === "touchstart") e.preventDefault();

		const mouseMoveX = getEventPageX(e) - ulRef.current.offsetLeft - startX;
		dispatch(moveSlider(mouseMoveX));
	}

	function handleChangeCategory(category: string) {
		const newCategory = category === "All" ? "" : category;
		dispatch(setActiveCategory(newCategory.toLowerCase()));
	}

	return (
		<ul
			ref={ulRef}
			// desktop
			onMouseDown={handleMouseDown}
			onMouseUp={() => dispatch(setIsMouseDown(false))}
			onMouseLeave={() => dispatch(setIsMouseDown(false))}
			onMouseMove={handleMouseMove}
			// mobile
			onTouchStart={handleMouseDown}
			onTouchEnd={() => dispatch(setIsMouseDown(false))}
			onTouchCancel={() => dispatch(setIsMouseDown(false))}
			onTouchMove={handleMouseMove}
			className="categoriesMask px-10 h-14 whitespace-nowrap overflow-hidden flex items-center gap-5 max-sm:px-5">
			{categoriesData.map((category, idx) => (
				<li
					key={idx}
					tabIndex={0}
					title={category}
					onClick={() => handleChangeCategory(category)}
					className="select-none min-w-44 h-10 rounded-xl shadow-md flex justify-center items-center capitalize font-medium text-lg bg-custom-grey-light text-custom-black transition cursor-pointer hover:bg-custom-black hover:text-custom-white active:scale-95 active:cursor-grabbing max-sm:text-base">
					{category}
				</li>
			))}
		</ul>
	);
}
