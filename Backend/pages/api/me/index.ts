import { NextApiRequest, NextApiResponse } from 'next';
import { findUserByID, updateUserByID } from 'controllers/user';
import { decodeToken } from 'lib/jwt';
import { UserInterface, UserTokenDecoded } from 'lib/types';
import { handlerCORS } from 'lib/middlewares';

async function user(req: NextApiRequest, res: NextApiResponse): Promise<UserInterface | void> {
	try {
		let userId: string;
		const authorization = req.headers.authorization;
		if (authorization) {
			const { userID }: UserTokenDecoded = decodeToken(authorization);
			userId = userID;
		} else {
			return res.status(401).json({ Message: 'Missing authorization in the headers.' });
		}

		if (req.method === 'GET') {
			const newUser: UserInterface = await findUserByID(userId);
			res.status(201).json(newUser);
			return;
		}
		if (req.method === 'PATCH') {
			const userUpdated: UserInterface = await updateUserByID(userId, req.body);
			res.status(200).json(userUpdated);
			return;
		}
		return res.status(501).send({
			Message: `This method is not allowed ${req.method}. Only can support GET or PATCH method`,
		});
	} catch (e) {
		console.error({ Message: 'Error at endpoint me', Error: e });
		res.status(500).send('Error on the server.');
	}
}
export default handlerCORS(user);
