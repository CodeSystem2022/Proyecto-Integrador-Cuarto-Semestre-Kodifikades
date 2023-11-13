import dbConnect from 'lib/connection';
import User from 'models/user';
import { UserInterface, UserWithIDInterface } from 'lib/types';

export async function createUser(email: string): Promise<UserInterface> {
	try {
		const newUser = new User({
			email,
			name: '',
			surname: '',
			address: {},
			identification: {},
			phone: {},
		});
		const userSaved: UserInterface = await newUser.save();
		return userSaved;
	} catch (error) {
		console.error({ Message: 'Error to create user', Error: error.message });
		throw error;
	}
}

export async function findAllUser(): Promise<UserInterface[]> {
	await dbConnect();
	try {
		const allUsers: UserInterface[] = await User.find({});
		return allUsers;
	} catch (error) {
		console.error({ Message: 'Error to find user', Error: error.message });
		throw error;
	}
}

export async function findUserByID(id: string): Promise<UserInterface> {
	await dbConnect();
	try {
		const userByID: UserInterface = await User.findById(id).exec();
		return userByID;
	} catch (error) {
		console.error({ Message: 'Error to find user by id', Error: error.message });
		throw error;
	}
}

export async function updateUserByID(id: string, data: UserInterface): Promise<UserInterface> {
	await dbConnect();
	try {
		const userUpdated: UserInterface = await User.findByIdAndUpdate(id, data, {
			returnDocument: 'after',
		});
		return userUpdated;
	} catch (error) {
		console.error({ Message: 'Error to update user by id', Error: error.message });
		throw error;
	}
}
