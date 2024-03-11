export default function ParamsButton({ children, title, styles }: ParamsButtonProps) {
	return (
		<button
			type="button"
			title={title}
			className={`${styles} w-full text-center py-1 rounded shadow-sm text-custom-black text-sm font-normal transition hover:bg-custom-white disabled:active:scale-95`}>
			{children}
		</button>
	);
}
