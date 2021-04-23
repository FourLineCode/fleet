import { StatusCodes } from 'http-status-codes';
import { NextApiHandler } from 'next';
import { authorize } from '~lib/middlewares/authorize';
import { createCookie } from '~lib/utils/createCookie';

const signoutHandler: NextApiHandler = async (req, res) => {
	if (req.method === 'POST') {
		const { authorized } = await authorize(req);
		if (!authorized) {
			res.status(StatusCodes.FORBIDDEN).json({ message: 'You are not authorized' });
			return;
		}

		const token = req.cookies['auth-token'];
		const refreshToken = req.cookies['refresh-token'];

		if (!token && !refreshToken) {
			res.status(StatusCodes.FORBIDDEN).json({ message: 'You are not signed in' });
			return;
		}

		res.setHeader('Set-Cookie', [
			createCookie({ name: 'auth-token', value: '', age: -1 }),
			createCookie({ name: 'refresh-token', value: '', age: -1 }),
		]);

		res.status(StatusCodes.OK).json({ success: true });
	} else {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).json({ message: 'Method not allowed' });
	}
};

export default signoutHandler;
