import jwt from 'jsonwebtoken';
import { UserTokenDecoded } from 'lib/types';

export function generateToken(obj): string {
	const token: string = jwt.sign(obj, process.env.JWT_SECRET);
	return token;
}

export function decodeToken(token): UserTokenDecoded {
	try {
		const splitedToken = token.split(' ');
		const decoded: UserTokenDecoded = jwt.verify(splitedToken[1], process.env.JWT_SECRET);
		return decoded;
	} catch (error) {
		console.error({ Message: 'Error in decode token', Error: error.message });
		throw error;
	}
}
