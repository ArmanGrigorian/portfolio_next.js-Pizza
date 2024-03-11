import { ParamsButton, ParamsDiv } from ".";

export default function PizzaParams(pizza: T_pizza) {
  const { activeDough, sizes, doughs, activePrice } = pizza
  
	return (
		<div className="w-full bg-custom-grey-light p-2 rounded-lg shadow-sm flex flex-col gap-2">
			<ParamsDiv>
				{doughs.map((dough, idx) => (
					<ParamsButton key={idx} styles={`${dough === activeDough && "bg-custom-white"}`}>
						{dough}
					</ParamsButton>
				))}
			</ParamsDiv>
			<ParamsDiv>
        {sizes.map((size, idx) => (
					<ParamsButton key={idx} styles={`${size === sizes[activePrice] && "bg-custom-white"}`}>
						{size}
					</ParamsButton>
				))}
			</ParamsDiv>
		</div>
	);
}
