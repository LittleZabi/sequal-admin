import { getFilterAndCatTypes, getPagination, parse } from '$lib/globals';
import { getCategories } from '$lib/item-list';
import type { PageServerLoad } from './$types';

export const load = (async ({ url, cookies }) => {
	const { skip, limit, page } = getPagination(cookies, url);
	const { ctype, category, filter, sort } = getFilterAndCatTypes(url.searchParams);
    const {total, categories} = await getCategories(skip, limit, ctype, category, filter, sort);
	return { categories: JSON.stringify(categories),filters: {ctype: category, filter, sort}, pageNo: page, total, prev_cat: {type: url.searchParams.get('category-type') } };
	
}) satisfies PageServerLoad;
