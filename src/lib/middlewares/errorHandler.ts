import { NextApiResponse } from 'next';

export const errorHandler = (err: Error, res: NextApiResponse) => {
	const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

	res.status(statusCode).json({
		message: statusCode === 500 ? 'Unknown error occured' : err.message,
		stack: process.env.NODE_ENV === 'production' ? 'NO_STACK_TRACE' : err.stack,
	});
};
