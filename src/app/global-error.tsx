"use client";

import { ResetButton } from "@/components";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
  }) {
  
  function handleReset() {
    reset();
  }
  
	return (
		<html>
			<body>
				<main className="max-w-7xl mx-auto h-[100dvh] bg-custom-white">
					<h1 className="text-custom-black text-5xl font-bold max-sm:text-4xl">Something went wrong!</h1>
					<ResetButton handleReset={handleReset}/>
				</main>
			</body>
		</html>
	);
}
