import { StatusCodes } from 'http-status-codes';
import { NextApiHandler } from 'next';
import prisma from '~/prisma/client';

// TDOD: Authorize middleware
const userHandler: NextApiHandler = async (req, res) => {
	if (req.method === 'GET') {
		const users = await prisma.user.findMany({
			include: {
				fleet: true,
				followers: true,
				following: true,
				like: true,
				reply: true,
			},
		});

		res.status(StatusCodes.OK).json(users);
	} else {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).json({ error: 'Method not allowed' });
	}
};

export default userHandler;
