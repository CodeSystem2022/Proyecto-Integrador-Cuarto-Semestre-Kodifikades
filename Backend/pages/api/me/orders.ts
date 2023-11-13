import { NextApiRequest, NextApiResponse } from 'next';
import { getMyOrders } from 'controllers/order';
import { authMiddleware } from 'lib/middlewares';
import { handlerCORS } from 'lib/middlewares';

async function getOrders(req: NextApiRequest, res: NextApiResponse, token) {
	try {
		if (req.method !== 'GET') {
			return res.status(501).send({
				Message: `This method is not allowed ${req.method}. Only can support GET method`,
			});
		}
		const allMyOrders = await getMyOrders(token.userID);
		res.status(201).json(allMyOrders);
	} catch (e) {
		console.error({ Message: 'Error at create order auth', Error: e });
		res.status(500).send('Error on the server.');
	}
}

export default handlerCORS(authMiddleware(getOrders));
