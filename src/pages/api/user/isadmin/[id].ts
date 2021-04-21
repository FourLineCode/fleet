import { StatusCodes } from 'http-status-codes';
import { NextApiHandler } from 'next';
import { authorize } from '~/lib/middlewares/authorize';
import prisma from '~/prisma/client';

const infoHandler: NextApiHandler = async (req, res) => {
	const id = parseInt(req.query.id as string);

	if (req.method === 'GET') {
		const { authorized } = await authorize(req);
		if (!authorized) {
			res.status(StatusCodes.FORBIDDEN).json({ message: 'You are not authorized' });
			return;
		}

		const user = await prisma.user.findFirst({ where: { id } });
		if (!user) {
			res.status(StatusCodes.BAD_REQUEST).json({ message: 'User not found' });
			return;
		}

		res.status(StatusCodes.OK).json({ isAdmin: user.isAdmin });
	} else {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).json({ message: 'Method not allowed' });
	}
};

export default infoHandler;
