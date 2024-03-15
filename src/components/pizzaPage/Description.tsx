export default function Description({ title }: { title: string }) {
	return (
		<p className="text-justify text-custom-black text-base font-normal w-4/5 max-sm:w-full">
			<span className="text-custom-green font-semibold">{title}</span> pizza lorem ipsum dolor sit
			amet consectetur adipisicing elit. Repellat soluta dolores, repudiandae sed, dicta cupiditate
			quaerat ut distinctio perferendis velit laudantium tempore ipsum veritatis ad voluptates
			inventore doloribus, animi beatae?
		</p>
	);
}
