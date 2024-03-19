"use client";
import { selectProducts, setActiveCategory } from "@/lib/features/products/productsSlice";
import {
	activateSlider,
	moveSlider,
	selectSlider,
	setIsMouseDown,
} from "@/lib/features/slider/sliderSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { getEventPageX } from "@/utils/helpers";
import { useEffect, useRef } from "react";

export default function Categories() {
	const ulRef = useRef<HTMLUListElement>(null);
	const startTimeRef = useRef<Date | null>(null);

	const dispatch = useAppDispatch();
	const { menuCategories, activeCategory } = useAppSelector(selectProducts);
	const { scrollLeft, mouseMoveX, startX, isMouseDown } = useAppSelector(selectSlider);

	useEffect(() => {
		if (!ulRef.current) return;
		ulRef.current.scrollLeft = scrollLeft - mouseMoveX;
	}, [mouseMoveX, scrollLeft]);

	function handleMouseDown(e: MouseTouchEvent<HTMLUListElement>) {
		if (!ulRef.current) return;
		if (e.pageX === undefined) e.preventDefault();

		e.stopPropagation();

		const scrollLeft = ulRef.current.scrollLeft;
		const startX = getEventPageX(e) - ulRef.current.offsetLeft;

		dispatch(activateSlider({ startX, scrollLeft }));
	}

	function handleMouseMove(e: MouseTouchEvent<HTMLUListElement>) {
		if (!ulRef.current || !isMouseDown) return;
		if (e.pageX === undefined) e.preventDefault();

		e.stopPropagation();

		const mouseMoveX = getEventPageX(e) - ulRef.current.offsetLeft - startX;
		dispatch(moveSlider(mouseMoveX));
	}

	function handleChangeCategoryMouseDown() {
		startTimeRef.current = new Date();
	}

	function handleChangeCategoryMouseUp(category: string) {
		if (!startTimeRef.current) return;

		const endTime = new Date();
		const elapsedTime = endTime.getTime() - startTimeRef.current.getTime();

		if (elapsedTime > 100) return;

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
			className="categoriesMask cursor-grab px-10 h-16 whitespace-nowrap overflow-hidden flex items-center gap-10 active:cursor-grabbing max-sm:px-5 max-sm:gap-4">
			{menuCategories.map((category, idx) => {
				const active = activeCategory.length ? activeCategory : "all";
				return (
					<li
						key={idx}
						tabIndex={0}
						title={category}
						onMouseDown={handleChangeCategoryMouseDown}
						onMouseUp={() => handleChangeCategoryMouseUp(category)}
						className={`${
							active === category.toLowerCase() ? "bg-custom-yellow" : ""
						} select-none min-w-44 h-11 rounded-xl shadow-md flex justify-center items-center capitalize font-medium text-lg bg-custom-grey-light text-custom-black transition cursor-pointer hover:bg-custom-black hover:text-custom-white active:scale-95 active:cursor-grabbing max-sm:text-base`}>
						{category}
					</li>
				);
			})}
		</ul>
	);
}
