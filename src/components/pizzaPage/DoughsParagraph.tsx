export default function DoughsParagraph({ title, doughs }: { title: string; doughs: string[] }) {
	return (
		<p className="text-justify text-custom-black text-base font-normal w-4/5 max-sm:w-full">
			We make <span className="text-custom-green font-semibold">{title}</span> pizza with{" "}
			<span className="text-custom-green font-semibold">{doughs.length}</span> types of dough:{" "}
			{new Intl.ListFormat("en", { style: "long", type: "conjunction" }).format(doughs)}. Lorem
			ipsum dolor, sit amet consectetur adipisicing elit. Nihil possimus commodi magni dolorum odit
			natus, minus et assumenda quisquam voluptatum! Saepe quibusdam quidem porro perspiciatis cum
			odio laboriosam quam ab.
		</p>
	);
}
