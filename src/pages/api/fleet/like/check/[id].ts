import { StatusCodes } from 'http-status-codes';
import { NextApiHandler } from 'next';
import { authorize } from '~lib/middlewares/authorize';
import { errorHandler } from '~lib/middlewares/errorHandler';
import prisma from '~prisma/client';

const likeCheckHandler: NextApiHandler = async (req, res) => {
	const id = parseInt(req.query.id as string);

	try {
		if (req.method === 'GET') {
			const { authorized, user: currentUser } = await authorize(req);
			if (!authorized || !currentUser) {
				res.status(StatusCodes.FORBIDDEN);
				throw new Error('You are not authorized');
			}

			const fleet = await prisma.fleet.findFirst({ where: { id } });
			if (!fleet) {
				res.status(StatusCodes.BAD_REQUEST);
				throw new Error('Fleet not found');
			}

			const like = await prisma.like.findFirst({
				where: { userId: currentUser.id, fleetId: fleet.id },
			});

			if (!like) {
				res.status(StatusCodes.OK).json({ liked: false });
				return;
			}

			res.status(StatusCodes.OK).json({ liked: true });
		} else {
			res.status(StatusCodes.METHOD_NOT_ALLOWED);
			throw new Error('Method not allowed');
		}
	} catch (error) {
		errorHandler(error, res);
	}
};

export default likeCheckHandler;
