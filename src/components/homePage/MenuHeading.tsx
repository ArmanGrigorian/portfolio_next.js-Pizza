import { MenuTitle, SortPanel } from ".";

export default function MenuHeading() {
	return (
		<div className="flex justify-between items-center gap-2 px-5 p-9 max-sm:p-6 max-sm:px-3 max-xsm:flex-col">
			<MenuTitle />
			<SortPanel />
		</div>
	);
}
