export default function PriceTag({ activePrice, prices }: PriceTagProps) {
	return (
		<strong className="absolute z-10 -bottom-5 font-bold text-center text-custom-black bg-custom-yellow w-1/3 py-0.5 rounded shadow">
			{prices[activePrice]} &#36;
		</strong>
	);
}
