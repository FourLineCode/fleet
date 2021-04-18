import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import { NextApiHandler } from 'next';
import prisma from '~/prisma/client';
import { createCookie } from '~/src/lib/utils/createCookie';
import { signToken } from '~/src/lib/utils/jwt';
import { signinShema } from '~/src/lib/validation/signinSchema';

const signinHandler: NextApiHandler = async (req, res) => {
	if (req.method === 'POST') {
		try {
			signinShema.validateSync(req.body);
		} catch (error) {
			res.status(StatusCodes.BAD_REQUEST).json(error);
			return;
		}

		const { email, password } = req.body;

		const user = await prisma.user.findFirst({
			where: {
				email: email.toLowerCase(),
			},
		});
		if (!user) {
			res.status(StatusCodes.BAD_REQUEST).json({ error: 'User not found' });
			return;
		}

		const validated = await bcrypt.compare(password, user.password);

		if (!validated) {
			res.status(StatusCodes.FORBIDDEN).json({ error: 'Invalid credentials' });
			return;
		}

		const payload = {
			id: user.id,
			username: user.username,
			displayName: user.displayName,
		};

		const token = signToken({ payload, age: '24h', type: 'AUTH' });
		const refreshToken = signToken({ payload, age: '1y', type: 'REFRESH' });

		res.setHeader('Set-Cookie', [
			createCookie('auth-token', token, 1),
			createCookie('refresh-token', refreshToken, 365),
		]);

		res.status(StatusCodes.OK).json({
			success: true,
			id: user.id,
			token,
			refreshToken,
		});
	} else {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).json({ error: 'Method not allowed' });
	}
};

export default signinHandler;
