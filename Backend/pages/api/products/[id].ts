import { NextApiRequest, NextApiResponse } from 'next';
import { searchProductAlgolia } from 'controllers/algolia';
import { UserInterface } from 'lib/types';
import { handlerCORS } from 'lib/middlewares';

async function searchProduct(
	req: NextApiRequest,
	res: NextApiResponse,
): Promise<UserInterface | void> {
	try {
		if (req.method !== 'GET') {
			return res.status(501).send({
				Message: `This method is not allowed ${req.method}. Only can support GET method`,
			});
		}
		const { id } = req.query;
		const product = await searchProductAlgolia([id] as string[]);
		res.status(200).json({ product });
	} catch (e) {
		console.error({ Message: 'Error at endpoint auth', Error: e });
		res.status(500).send('Error on the server.');
	}
}
export default handlerCORS(searchProduct);