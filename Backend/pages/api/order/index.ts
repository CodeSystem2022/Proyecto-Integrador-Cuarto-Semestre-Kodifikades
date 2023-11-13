import { NextApiRequest, NextApiResponse } from 'next';
import { findUserByID } from 'controllers/user';
import { searchProductAlgolia } from 'controllers/algolia';
import { createOrderDB } from 'controllers/order';
import { authMiddleware } from 'lib/middlewares';
import { UserInterface } from 'lib/types';
import { handlerCORS } from 'lib/middlewares';

async function createOrder(req: NextApiRequest, res: NextApiResponse, token) {
	try {
		if (req.method !== 'POST') {
			return res.status(501).send({
				Message: `This method is not allowed ${req.method}. Only can support POST method`,
			});
		}
		const { productsIDs } = req.body;
		if (!productsIDs) return res.status(400).send('Product ID is required');
		const userByID: UserInterface = await findUserByID(token.userID);
		const productsByIDs = await searchProductAlgolia(productsIDs as string[]);
		const orderCreated = await createOrderDB(userByID, productsByIDs, productsIDs);
		res.status(201).json(orderCreated);
	} catch (e) {
		console.error({ Message: 'Error at create order auth', Error: e });
		res.status(500).send('Error on the server.');
	}
}
export default handlerCORS(authMiddleware(createOrder));
