import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const productsApi = createApi({
	reducerPath: "productsApi",
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	tagTypes: ["Products"],
	endpoints: (builder) => ({
		getPokemonByName: builder.query({
			query: (params) => {
				const { activeCategory, activeSort } = params;
				return `/menu?categories=*${activeCategory}&sortBy=${activeSort}`;
			},
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }: { id: number }) => ({ type: "Products", id } as const)),
							{ type: "Products", id: "LIST" },
					  ]
					: [{ type: "Products", id: "LIST" }],
		}),
	}),
});

export const { useGetPokemonByNameQuery } = productsApi;
