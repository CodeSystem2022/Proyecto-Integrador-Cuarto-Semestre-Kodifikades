import { NextApiRequest, NextApiResponse } from 'next';
import { getOrder } from 'controllers/order';
import { UserInterface } from 'lib/types';
import { handlerCORS } from 'lib/middlewares';

async function searchOrder(
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
		const order = await getOrder(id as string);
		res.status(200).json({ order });
	} catch (e) {
		console.error({ Message: 'Error at endpoint auth', Error: e });
		res.status(500).send('Error on the server.');
	}
}
export default handlerCORS(searchOrder);
