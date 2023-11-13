import { NextApiRequest, NextApiResponse } from 'next';
import { changeOrderStatusAndNotifyUser } from 'controllers/order';
import { handlerCORS } from 'lib/middlewares';

async function mercadopago(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== 'POST') {
			return res.status(501).send({
				Message: `This method is not allowed ${req.method}. Only can support POST method`,
			});
		}
		const { id, topic } = req.query;
		const result = await changeOrderStatusAndNotifyUser(id as string, topic as string);
		res.status(200).send(result);
	} catch (error) {
		res.status(400).json(error);
	}
}
export default handlerCORS(mercadopago);
