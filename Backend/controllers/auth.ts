import dbConnect from 'lib/connection';
import Auth from 'models/auth';
import { createUser } from './user';
import sendCode from 'lib/sendgrid';
import { addMinutesToDate, isCodeExpired } from 'lib/date';
import { AuthUser } from 'lib/types';

function getRandomIntToString() {
	return (Math.floor(Math.random() * (99999 - 10000)) + 10000).toString();
}

async function createAuth(data: AuthUser): Promise<AuthUser> {
	const { email, userID, code, expires } = data;
	try {
		const newAuth = new Auth({ email, userID, code, expires });
		const authSaved: AuthUser = await newAuth.save();
		return authSaved;
	} catch (e) {
		console.error({ Message: 'Error to create auth', Error: e });
		return e;
	}
}

export async function findOrCreateAuthWithEmail(email: string) {
	await dbConnect();

	try {
		const cleanEmail = email.trim().toLowerCase();
		const auth = await Auth.findOne({ email: cleanEmail });
		const randomCode = getRandomIntToString();

		// If the auth doesn't exists, I will create a new user and new auth.
		if (auth) {
			const userAuthUpdated = await Auth.findOneAndUpdate(
				{ userID: auth.userID },
				{ code: randomCode, expires: addMinutesToDate() },
			);
			const sengridResponse = await sendCode(userAuthUpdated.email, randomCode);
			return { email: auth.email, code: randomCode, sengridResponse };
		} else {
			const newUser = await createUser(cleanEmail);
			const newAuth: AuthUser = await createAuth({
				email: cleanEmail,
				userID: newUser.id.toString(),
				code: randomCode,
				expires: addMinutesToDate(),
			});
			const sengridResponse = await sendCode(newAuth.email, newAuth.code);
			console.log(sengridResponse);
			return { newAuth, sengridResponse };
		}
	} catch (e) {
		console.error({ Message: 'Error to find or create auth with email', Error: e });
		return e;
	}
}

export async function checkUserEmailAndCodeAuth(email: string, code: string) {
	await dbConnect();

	try {
		const cleanEmail = email.trim().toLowerCase();
		const authUser = await Auth.findOne({ email: cleanEmail });

		if (authUser && authUser.code === code && !isCodeExpired(authUser.expires)) {
			return authUser.userID;
		} else {
			console.error('Your email or code is incorrect o expires.');
		}
	} catch (e) {
		console.error({ Message: 'Problems to check email and code auth.', Error: e });
		return e;
	}
}
