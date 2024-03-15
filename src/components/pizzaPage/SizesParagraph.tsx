export default function SizesParagraph({ sizes, prices }: { sizes: string[]; prices: number[] }) {
	return (
		<div className="w-4/5 text-left text-custom-black text-base font-normal max-sm:w-full">
			<p>
				Available in <span className="text-custom-green font-semibold">{prices.length} </span> sizes
				:
			</p>
			{prices.map((price, idx) => (
				<p key={crypto.randomUUID()}>
					{sizes[idx]} sm - <strong>{price} &#36;</strong>;
				</p>
			))}
		</div>
	);
}
