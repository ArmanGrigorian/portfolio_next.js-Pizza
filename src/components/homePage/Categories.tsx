"use client";
import { MouseEvent, TouchEvent, useEffect, useMemo, useRef, useState } from "react";
import { LOCAL_DATA } from "../../../DATA";


export default function Categories() {
	const categoriesData = useMemo(() => {
		return ["All", ...Array.from(new Set(LOCAL_DATA.flatMap((pizza) => pizza.categories)))];
	}, []);

	const ulRef = useRef<HTMLUListElement>(null);
	const [inDown, setInDown] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);
	const [mouseMoveX, setMouseMoveX] = useState(0);

	function handleMouseDown(e: MouseTouchEvent<HTMLUListElement>) {
		if (!ulRef?.current) return;
		setInDown(true);

		if (e.type === "touchstart") {
			setStartX((e as TouchEvent<HTMLUListElement>).touches[0].pageX - ulRef.current.offsetLeft);
		} else {
			setStartX((e as MouseEvent<HTMLUListElement>).pageX - ulRef.current.offsetLeft);
		}
		setScrollLeft(ulRef.current.scrollLeft);
		setMouseMoveX(0);
	}

	function handleMouseUp() {
		setInDown(false);
	}

	function handleMouseLeave() {
		setInDown(false);
	}

	function handleMouseMove(e: MouseTouchEvent<HTMLUListElement>) {
		if (!ulRef?.current || !inDown) return;

		if (e.type === "touchmove") {
			setMouseMoveX(
				(e as TouchEvent<HTMLUListElement>).touches[0].pageX - ulRef.current.offsetLeft - startX,
			);
		} else {
			setMouseMoveX((e as MouseEvent<HTMLUListElement>).pageX - ulRef.current.offsetLeft - startX);
		}
	}

	useEffect(() => {
		if (!ulRef.current) return;
		ulRef.current.scrollLeft = scrollLeft - mouseMoveX;
	}, [mouseMoveX, scrollLeft]);

	return (
		<ul
			ref={ulRef}
			// desktop
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseLeave}
			onMouseMove={handleMouseMove}
			// mobile
			onTouchStart={handleMouseDown}
			onTouchEnd={handleMouseUp}
			onTouchCancel={handleMouseLeave}
			onTouchMove={handleMouseMove}
			className="categoriesMask px-10 h-14 whitespace-nowrap overflow-hidden flex items-center gap-5">
			{categoriesData.map((category, idx) => (
				<li
					key={idx}
					className="select-none min-w-44 h-10 rounded-xl shadow-md flex justify-center items-center capitalize font-medium text-lg bg-custom-grey-light text-custom-black transition cursor-pointer hover:bg-custom-black hover:text-custom-white active:scale-95 active:cursor-grabbing max-sm:text-base">
					{category}
				</li>
			))}
		</ul>
	);
}
