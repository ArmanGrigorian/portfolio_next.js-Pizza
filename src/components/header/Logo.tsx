import Image from "next/image";
import Link from "next/link";
import logoPic from "../../../public/icons/pizza.png";


export default function Logo() {
	return (
		<Link href="/" className="flex items-center gap-2 max-sm:gap-1">
			<Image src={logoPic} width={38} height={38} alt="pizza png" priority />

			<div>
				<h1 className="text-4xl text-custom-black font-extrabold max-sm:text-3xl max-xsm:text-2xl">
					Next Pizza
				</h1>

				<p className="text-sm text-custom-grey-dark font-medium max-sm:hidden">
					The most delicious pizza in the universe
				</p>
			</div>
		</Link>
	)
}