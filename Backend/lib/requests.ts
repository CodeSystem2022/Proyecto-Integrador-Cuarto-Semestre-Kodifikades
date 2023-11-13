import type { NextApiRequest, NextApiResponse } from 'next';

export function getOffsetAndLimitFromQuery(
	req: NextApiRequest,
	maxOffset: number = 1000,
	maxLimit: number = 100,
): { offset: number; limit: number } {
	try {
		const queryOffset = parseInt((req.query.offset as string) || '0');
		const queryLimit = parseInt((req.query.limit as string) || '0');
		const offset = queryOffset < maxOffset ? queryOffset : 0;

		let limit = 10;
		if (queryLimit > 0 && queryLimit < maxLimit) {
			limit = queryLimit;
		} else if (queryLimit > maxLimit) {
			limit = maxLimit;
		}
		return { offset, limit };
	} catch (error) {
		console.error({ Message: 'Error at get offset and limit', Error: error.message });
		throw error;
	}
}
