import { TotalsDiv } from ".";

export default function Purchase() {
	return (
		<div className="px-5 h-14 flex justify-between items-center gap-5 max-sm:px-3">
			<TotalsDiv />

			<button
				type="button"
				title="Order now"
				className="select-none w-32 h-12 flex justify-center items-center bg-custom-green text-custom-white text-base font-bold rounded-3xl shadow-xl transition hover:bg-custom-black hover:text-custom-white active:scale-95 max-sm:text-sm max-sm:w-28 max-xsm:rounded-2xl max-xsm:h-11">
				Order Now
			</button>
		</div>
	);
}
