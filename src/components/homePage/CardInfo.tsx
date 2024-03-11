import Image from "next/image";

export default function CardInfo({ image, blur, title }: CardInfoProps) {
	return (
		<>
			<Image
				src={image}
				width={256}
				height={256}
				alt={`${title} image`}
				blurDataURL={blur}
				placeholder="blur"
				priority
			/>
			<h3 className="text-custom-black text-lg font-semibold">{title}</h3>
		</>
	);
}
