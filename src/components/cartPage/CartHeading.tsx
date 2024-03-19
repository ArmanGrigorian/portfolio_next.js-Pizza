import { CartTitle, ClearCartButton } from ".";

export default function CartHeading() {
	return (
		<div className="flex justify-between items-center gap-2 px-5 py-9 max-sm:py-6 max-sm:px-3">
			<CartTitle />
			<ClearCartButton />
		</div>
	);
}
