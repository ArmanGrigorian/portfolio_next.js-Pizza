import { Categories, Heading, Menu, SectionMenu } from "@/components";

export default function HomePage() {
	return (
		<main className="max-w-7xl mx-auto bg-custom-white">
			<SectionMenu>
				<Categories />
				<Heading />
				<Menu />
			</SectionMenu>
		</main>
	);
}
