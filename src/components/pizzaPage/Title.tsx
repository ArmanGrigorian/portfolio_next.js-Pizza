export default function Title({ title }: { title: string }) {
	return (
		<div>
			<h1 className="text-center text-custom-black text-5xl font-bold max-sm:text-4xl">
				{title} pizza
			</h1>

			<p className="text-center text-custom-grey-dark text-sm font-normal">
				Lorem ipsum dolor sit amet.
			</p>
		</div>
	);
}
