import { syncProductsFromAirtableToAlgolia } from 'lib/airtable';
import { productsIndex } from 'lib/algolia';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function syncProducts(
	req: NextApiRequest,
	res: NextApiResponse,
): Promise<void> {
	try {
		if (req.method !== 'GET') {
			return res.status(501).send({
				Message: `This method is not allowed ${req.method}. Only can support GET method`,
			});
		}
		const { limit } = req.query;
		syncProductsFromAirtableToAlgolia(Number(limit), productsIndex);
		res.status(201).json('Airtable has been sync with algolia.');
	} catch (e) {
		console.error({ Message: 'Error at endpoint auth', Error: e });
		res.status(500).send('Error on the server.');
	}
}
