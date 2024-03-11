export default function Option({ children, value }: OptionProps) {
	return (
		<option title={value} value={value} className="text-custom-black text-base font-normal">
			{children}
		</option>
	);
}
