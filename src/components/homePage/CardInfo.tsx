import Image from "next/image";
import Link from "next/link";

export default function CardInfo({ image, blur, title, origin_id }: CardInfoProps) {
	return (
		<Link href={`/${origin_id}`}
			className="flex flex-col items-center gap-2 text-custom-black hover:text-custom-yellow">
			<Image
				src={image}
				width={256}
				height={256}
				alt={`${title} image`}
				blurDataURL={blur}
				placeholder="blur"
				priority
			/>
			<h3 className="text-inherit text-lg font-semibold">{title}</h3>
		</Link>
	);
}
