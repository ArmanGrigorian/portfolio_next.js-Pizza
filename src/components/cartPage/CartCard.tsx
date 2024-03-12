import CardInfo from "./CardInfo";
import Controls from "./Controls";
import RemoveButton from "./RemoveButton";

export default function CartCard(pizza: T_cartPizza) {
	const { price } = pizza;

	return (
		<div className="w-full flex justify-between items-center gap-1 px-6 py-3 rounded-3xl shadow transition hover:shadow-lg hover:-translate-y-0.5 max-sm:flex-col max-sm:p-3 max-sm:gap-5 max-sm:w-2/3 max-xsm:w-full">
			<CardInfo {...pizza} />
			<Controls {...pizza} />
			<strong className="text-custom-black text-base font-semibold">{price} &#36;</strong>
			<RemoveButton {...pizza} />
		</div>
	);
}
