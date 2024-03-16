import ContentLoader from "react-content-loader";

export default function MenuCardSkeleton() {
	return (
		<ContentLoader
			speed={2}
			width={256}
			height={452}
			viewBox="0 0 256 452"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb">
			<rect x="88" y="259" rx="3" ry="3" width="88" height="17" />
			<rect x="87" y="424" rx="4" ry="4" width="85" height="28" />
			<rect x="177" y="383" rx="6" ry="6" width="70" height="30" />
			<rect x="14" y="289" rx="8" ry="8" width="230" height="81" />
			<circle cx="130" cy="128" r="115" />
			<rect x="13" y="386" rx="6" ry="6" width="25" height="22" />
		</ContentLoader>
	);
}
