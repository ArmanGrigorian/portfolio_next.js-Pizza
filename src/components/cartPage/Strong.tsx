export default function Strong({ children, value }: StrongProps) {
	return (
		<strong className="text-custom-black text-base font-semibold">
			{children} : {value}
		</strong>
	);
}
