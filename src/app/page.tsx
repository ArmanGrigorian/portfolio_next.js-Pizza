import { Categories, MenuHeading, Menu, MenuSection } from "@/components";

export default function HomePage() {
	return (
		<main className="max-w-7xl mx-auto bg-custom-white">
			<MenuSection>
				<Categories />
				<MenuHeading />
				<Menu />
			</MenuSection>
		</main>
	);
}
