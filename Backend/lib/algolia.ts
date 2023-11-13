import algoliasearch, { SearchClient, SearchIndex } from 'algoliasearch';

const client: SearchClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
const productsIndex: SearchIndex = client.initIndex('products');

productsIndex.setSettings({
	attributesToHighlight: [],
});

export { productsIndex };
