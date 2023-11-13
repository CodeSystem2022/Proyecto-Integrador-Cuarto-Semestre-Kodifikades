import { NextApiRequest, NextApiResponse } from 'next';
import { searchProducts } from 'controllers/algolia';
import { UserInterface } from 'lib/types';
import { getOffsetAndLimitFromQuery } from 'lib/requests';
import { handlerCORS } from 'lib/middlewares';

async function searchProductsQuery(
	req: NextApiRequest,
	res: NextApiResponse,
): Promise<UserInterface | void> {
	try {
		if (req.method !== 'GET') {
			return res.status(501).send({
				Message: `This method is not allowed ${req.method}. Only can support GET method`,
			});
		}
		const { limit, offset } = getOffsetAndLimitFromQuery(req);
		const { product } = req.query;
		const products = await searchProducts(product as string, { limit, offset });
		res.status(200).json({
			results: products,
			pagination: {
				limit,
				offset,
				total: products.total,
			},
		});
	} catch (e) {
		console.error({ Message: 'Error at endpoint search products', Error: e });
		res.status(500).send('Error on the server.');
	}
}
export default handlerCORS(searchProductsQuery);
