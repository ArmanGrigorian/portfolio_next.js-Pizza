import Image from "next/image";
import cartPic from "../../../public/icons/cartBig.png";

export default function CartTitle() {
	return (
		<h2 className="flex items-center gap-2 text-custom-black text-3xl font-extrabold">
			<Image src={cartPic} width={32} height={32} alt="cart png" />
			Cart
		</h2>
	);
}
