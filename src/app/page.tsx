import { Categories, Menu, MenuHeading } from "@/components";

export default function HomePage() {
	return (
		<main className="max-w-7xl mx-auto bg-custom-white">
			<Categories />
			<MenuHeading />
			<Menu />
		</main>
	);
}
