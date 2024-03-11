
export default function Option({ children }: { children: React.ReactNode }) {
	return (
		<option className="text-custom-black text-base font-normal" value="title">
			{children}
		</option>
	);
}
