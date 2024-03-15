export default function ResetButton({ handleReset }: { handleReset: () => void }) {
	return (
		<button
			title="reset"
			onClick={handleReset}
			className="select-none w-32 h-12 text-custom-white text-base font-bold flex justify-center items-center gap-2 bg-custom-yellow rounded-3xl shadow-xl transition hover:bg-custom-black active:scale-95 max-sm:text-sm max-sm:w-28 max-xsm:rounded-2xl max-xsm:w-20 max-xsm:h-11">
			Try Again
		</button>
	);
}
