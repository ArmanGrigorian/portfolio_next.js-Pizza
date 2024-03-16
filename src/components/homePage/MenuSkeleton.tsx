import { MenuCardSkeleton } from ".";

export default function SkeletonMenu() {
	return (
		<div className="flex flex-wrap justify-around items-start gap-x-7 gap-y-11 p-5 pb-10 max-sm:p-3 max-sm:pb-8">
			{new Array(8).fill(null).map((val, idx) => (
				<MenuCardSkeleton key={idx} />
			))}
		</div>
	);
}
