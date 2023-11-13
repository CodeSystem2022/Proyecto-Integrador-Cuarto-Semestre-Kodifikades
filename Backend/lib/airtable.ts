import Airtable from 'airtable';
export const airtableBase = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
	process.env.AIRTABLE_BASE,
);

export function syncProductsFromAirtableToAlgolia(limit: number, productsIndex) {
	try {
		productsIndex.clearObjects();
		// use `firstPage` instead of `eachPage`.
		airtableBase('Furniture')
			.select({
				pageSize: limit,
			})
			.eachPage(
				async function (records, fetchNextPage) {
					const objects = records.map((r) => {
						const fields = r.fields;

						const filteredImages = () => {
							const images = fields.Images as [];
							return images.map((image) => {
								const { url, thumbnails } = image;
								return { url, thumbnails };
							});
						};
						const fieldsToReturn = {
							color: fields.Color,
							description: fields.Description,
							images: filteredImages(),
							stock: fields['In stock'],
							title: fields.title,
							unit_price: fields.unit_price,
						};
						return {
							objectID: r.id,
							fields: fieldsToReturn,
						};
					});
					await productsIndex.saveObjects(objects);
					fetchNextPage();
				},
				function done(err) {
					if (err) {
						console.error(err);
						return;
					}
					return 'Sync finished';
				},
			);
	} catch (error) {
		console.error({ Message: 'Error to search products in airtable', Error: error.message });
		throw error;
	}
}
