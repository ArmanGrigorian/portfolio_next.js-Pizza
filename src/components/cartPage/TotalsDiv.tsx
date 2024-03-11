import Strong from "./Strong";

export default function TotalsDiv() {
	return (
		<div className="flex flex-col">
			<Strong value={0}>Total Count</Strong>
			<Strong value={0}>Total Price</Strong>
		</div>
	);
}
