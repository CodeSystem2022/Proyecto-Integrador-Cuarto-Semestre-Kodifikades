import { productsIndex } from 'lib/algolia';
import { ProductInterface } from 'lib/types';

export async function searchProducts(
	querySearch: string,
	hitsPerPage: { limit: number; offset: number },
): Promise<{ products: {}; total: number }> {
	try {
		const { limit, offset } = hitsPerPage;
		const products = await productsIndex.search(querySearch, {
			hitsPerPage: limit,
			page: offset > 1 ? Math.floor(offset / limit) : 0,
		});
		return { products: products.hits, total: products.nbHits };
	} catch (error) {
		console.error({
			Message: 'Error at algolia search products controller.',
			Error: error.message,
		});
		throw error;
	}
}

export async function searchProductAlgolia(ids: string[]) {
	try {
		const products = await productsIndex.getObjects(ids);
		return products;
	} catch (error) {
		console.error({ Message: 'Error to get a product in algolia', Error: error.message });
		throw error;
	}
}

export async function searchProductsByIDsAlgolia(id: Array<string>) {
	try {
		const products = await productsIndex.browseObjects({
			objectIDs: id,
		});
		return products;
	} catch (error) {
		console.error({ Message: 'Error to get a product in algolia', Error: error.message });
		throw error;
	}
}
