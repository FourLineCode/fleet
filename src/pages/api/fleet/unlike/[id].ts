import { StatusCodes } from 'http-status-codes';
import { NextApiHandler } from 'next';
import { authorize } from '~lib/middlewares/authorize';
import { errorHandler } from '~lib/middlewares/errorHandler';
import prisma from '~prisma/client';

const unlikeHandler: NextApiHandler = async (req, res) => {
	const id = parseInt(req.query.id as string);

	try {
		if (req.method === 'POST') {
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
				res.status(StatusCodes.BAD_REQUEST);
				throw new Error('You have not liked this fleet');
			}

			await prisma.like.delete({ where: { id: like.id } });

			res.status(StatusCodes.OK).json({ success: true });
		} else {
			res.status(StatusCodes.METHOD_NOT_ALLOWED);
			throw new Error('Method not allowed');
		}
	} catch (error) {
		errorHandler(error, res);
	}
};

export default unlikeHandler;
