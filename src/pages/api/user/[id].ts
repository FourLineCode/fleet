import { StatusCodes } from 'http-status-codes';
import { NextApiHandler } from 'next';
import prisma from '~/prisma/client';

// TDOD: Authorize middleware
const userByIdHandler: NextApiHandler = async (req, res) => {
	const id = parseInt(req.query.id as string);

	if (req.method === 'GET') {
		const user = await prisma.user.findFirst({
			where: {
				id,
			},
			include: {
				followers: true,
				following: true,
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

export default userByIdHandler;
