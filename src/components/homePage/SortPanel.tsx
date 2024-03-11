import { Option } from ".";

export default function SortPanel() {
	return (
		<div className="flex items-center gap-2">
			<p className="text-custom-black text-base font-medium">Sort by :</p>
			<div className="px-2 py-1 border rounded">
				<select
					name="sort"
					className="w-full outline-offset-4 outline-custom-orange text-custom-orange text-base font-medium">
					<Option value={"name"}>name</Option>
					<Option value={"price"}> price ascending</Option>
					<Option value={"-price"}>price descending</Option>
				</select>
			</div>
		</div>
	);
}
