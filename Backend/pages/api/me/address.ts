import { NextApiRequest, NextApiResponse } from 'next';
import { updateUserByID } from 'controllers/user';
import { decodeToken } from 'lib/jwt';
import { UserInterface, UserTokenDecoded } from 'lib/types';
import { handlerCORS } from 'lib/middlewares';

async function myAddress(req: NextApiRequest, res: NextApiResponse): Promise<UserInterface | void> {
	try {
		if (req.method !== 'PATCH') {
			return res.status(501).send({
				Message: `This method is not allowed ${req.method}. Only can support POST method`,
			});
		}
		const authorization = req.headers.authorization;
		if (authorization) {
			const { userID }: UserTokenDecoded = decodeToken(authorization);
			const userUpdated: UserInterface = await updateUserByID(userID, req.body);
			res.status(200).json(userUpdated);
		} else {
			return res.status(401).json({ Message: 'Missing authorization in the headers.' });
		}
	} catch (e) {
		console.error({ Message: 'Error at endpoint address', Error: e });
		res.status(500).send('Error on the server.');
	}
}
export default handlerCORS(myAddress);
