export default function NotFound() {
	return (
		<main className="max-w-7xl mx-auto min-h-[calc(100dvh-112px)] bg-custom-white flex flex-col justify-center items-center gap-5 p-5 pb-10 max-sm:p-3 max-sm:pb-6 max-sm:gap-3">
			<h1 className="text-custom-black text-5xl font-extrabold max-sm:text-4xl">Not Found</h1>
			<p className="text-custom-grey-dark text-base font-medium">
				Could not find requested resource
			</p>
		</main>
	);
}
