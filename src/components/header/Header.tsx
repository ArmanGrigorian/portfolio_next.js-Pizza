import { Button, Logo } from ".";


export default function Header() {
	return (
			<header className="max-w-7xl mx-auto h-28 flex justify-between items-center gap-2 px-5 max-sm:h-20 max-sm:px-3">
			<Logo />
			<Button />
		</header>
	)
}

