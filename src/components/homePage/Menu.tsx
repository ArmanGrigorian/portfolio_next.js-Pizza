"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { MenuCard } from ".";
import { LOCAL_DATA } from "../../../DATA";

export default function Menu() {
	const [parent] = useAutoAnimate();
	return (
		<div
			ref={parent}
			className="flex flex-wrap justify-around items-start gap-x-7 gap-y-11 p-5 pb-10 max-sm:p-3 max-sm:pb-8">
			{LOCAL_DATA.map((pizza) => (
				<MenuCard key={pizza.origin_id} {...pizza} />
			))}
		</div>
	);
}
