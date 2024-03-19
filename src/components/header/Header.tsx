import { Button, Logo } from ".";

export default function Header() {
	return (
		<header className="max-w-7xl mx-auto bg-custom-white h-32 flex justify-between items-center gap-2 px-5 max-sm:h-24 max-sm:px-3">
			<Logo />
			<Button />
		</header>
	);
}

