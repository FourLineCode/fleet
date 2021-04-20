import { StatusCodes } from 'http-status-codes';
import { NextApiHandler } from 'next';
import { authorize } from '~/lib/middlewares/authorize';
import prisma from '~/prisma/client';

const infoHandler: NextApiHandler = async (req, res) => {
	const id = parseInt(req.query.id as string);

	if (req.method === 'GET') {
		const { authorized } = await authorize(req);
		if (!authorized) {
			res.status(StatusCodes.FORBIDDEN).json({ error: 'You are not authorized' });
			return;
		}

		const user = await prisma.user.findFirst({
			where: { id },
			select: {
				id: true,
				email: true,
				username: true,
				displayName: true,
				bio: true,
				avatarURL: true,
				isAdmin: true,
				createdAt: true,
			},
		});

		if (!user) {
			res.status(StatusCodes.BAD_REQUEST).json({ error: 'User not found' });
			return;
		}

		res.status(StatusCodes.OK).json(user);
	} else {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).json({ error: 'Method not allowed' });
	}
};

export default infoHandler;
