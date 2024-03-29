import { getFilterAndCatTypes, getPagination, parse } from '$lib/globals.js';
import { productList } from '$lib/item-list';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ url, cookies }) => {
	const { skip, limit, page } = getPagination(cookies, url);
	const { ctype, category, filter, sort } = getFilterAndCatTypes(url.searchParams);
	const {total, mobiles} = await productList(skip, limit, category, filter, sort, ctype);
	return { list: parse(mobiles), pageNo: page, total, filters: {ctype, category, filter, sort} };
};
