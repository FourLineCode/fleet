import { StatusCodes } from 'http-status-codes';
import { NextApiHandler } from 'next';
import { authorize } from '~lib/middlewares/authorize';
import prisma from '~prisma/client';

const userHandler: NextApiHandler = async (req, res) => {
	if (req.method === 'GET') {
		const { authorized } = await authorize(req);
		if (!authorized) {
			res.status(StatusCodes.FORBIDDEN).json({ message: 'You are not authorized' });
			return;
		}

		const users = await prisma.user.findMany({
			include: {
				fleets: true,
				followers: true,
				following: true,
				likes: true,
				replies: true,
			},
		});

		res.status(StatusCodes.OK).json(users);
	} else {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).json({ message: 'Method not allowed' });
	}
};

export default userHandler;
