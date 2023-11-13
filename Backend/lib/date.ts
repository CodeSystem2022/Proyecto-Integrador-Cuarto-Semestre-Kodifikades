import { addMinutes, isAfter, toDate } from 'date-fns';

export function addMinutesToDate() {
	const dateNow = new Date();
	return addMinutes(dateNow, 25);
}

export function isCodeExpired(isDataExpires) {
	try {
		const now = new Date();
		const expires = toDate(isDataExpires);
		return isAfter(now, expires);
	} catch (error) {
		console.error({ Message: 'Data is expires', Error: error.message });
		throw error;
	}
}
