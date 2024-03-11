import { CartTitle, ClearCartButton } from ".";

export default function CartHeading() {
	return (
		<div className="flex justify-between items-center gap-2 p-5 pt-9 max-sm:p-3 max-sm:pt-6">
			<CartTitle />
			<ClearCartButton />
		</div>
	);
}
