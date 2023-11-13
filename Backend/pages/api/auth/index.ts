import { findOrCreateAuthWithEmail } from 'controllers/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { handlerCORS } from 'lib/middlewares';

async function findOrCreateUser(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	try {
		if (req.method !== 'POST') {
			return res.status(501).send({
				Message: `This method is not allowed ${req.method}. Only can support POST method`,
			});
		}
		const newAuth = await findOrCreateAuthWithEmail(req.body.email);
		res.status(201).json(newAuth);
	} catch (e) {
		console.error({ Message: 'Error at endpoint auth', Error: e });
		res.status(500).send('Error on the server.');
	}
}

export default handlerCORS(findOrCreateUser);
