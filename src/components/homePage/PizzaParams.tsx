import { Doughs, ParamsDiv, Sizes } from ".";

export default function PizzaParams(pizza: T_pizza) {
	return (
		<div className="w-full bg-custom-grey-light p-2 rounded-lg shadow-sm flex flex-col gap-2">
			<ParamsDiv>
				<Doughs {...pizza} />
			</ParamsDiv>

			<ParamsDiv>
				<Sizes {...pizza} />
			</ParamsDiv>
		</div>
	);
}
