import { StatusCodes } from 'http-status-codes';
import { NextApiHandler } from 'next';
import { errorHandler } from '~lib/middlewares/errorHandler';
import { createCookie } from '~lib/utils/createCookie';
import { signToken, verifyToken } from '~lib/utils/jwt';

const refreshtokenHandler: NextApiHandler = async (req, res) => {
	try {
		if (req.method === 'GET') {
			const refreshToken = req.cookies['refresh-token'] as string;

			if (!refreshToken) {
				res.status(StatusCodes.FORBIDDEN);
				throw new Error('You do not have refresh token');
			}

			const verifiedUser = verifyToken({ token: refreshToken, type: 'REFRESH' });
			if (!verifiedUser) {
				res.status(StatusCodes.FORBIDDEN);
				throw new Error('Access denied');
			}

			const payload = {
				id: verifiedUser.id,
				username: verifiedUser.username,
				displayName: verifiedUser.displayName,
			};

			const newToken = signToken({ payload, age: '24h', type: 'AUTH' });
			const newRefreshToken = signToken({ payload, age: '1y', type: 'REFRESH' });

			res.setHeader('Set-Cookie', [
				createCookie({ name: 'auth-token', value: newToken, age: 1 }),
				createCookie({ name: 'refresh-token', value: newRefreshToken, age: 365 }),
			]);

			res.status(StatusCodes.OK).json({
				success: true,
				id: verifiedUser.id,
				token: newToken,
				refreshToken: newRefreshToken,
			});
		} else {
			res.status(StatusCodes.METHOD_NOT_ALLOWED);
			throw new Error('Method not allowed');
		}
	} catch (error) {
		errorHandler(error, res);
	}
};

export default refreshtokenHandler;
