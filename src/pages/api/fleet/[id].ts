import { StatusCodes } from 'http-status-codes';
import { NextApiHandler } from 'next';
import { authorize } from '~lib/middlewares/authorize';
import { errorHandler } from '~lib/middlewares/errorHandler';
import prisma from '~prisma/client';

const fleetByIdHandler: NextApiHandler = async (req, res) => {
	const id = parseInt(req.query.id as string);

	try {
		if (req.method === 'GET') {
			const { authorized, user: currentUser } = await authorize(req);
			if (!authorized || !currentUser) {
				res.status(StatusCodes.FORBIDDEN);
				throw new Error('You are not authorized');
			}

			const fleet = await prisma.fleet.findFirst({
				where: { id },
				include: {
					likes: true,
					author: true,
					replies: {
						include: {
							user: true,
						},
					},
				},
			});
			if (!fleet) {
				res.status(StatusCodes.BAD_REQUEST);
				throw new Error('Fleet not found');
			}

			for (const like of fleet.likes) {
				if (like.userId === currentUser.id) {
					res.status(200).json({ post: fleet, liked: true });
					return;
				}
			}

			res.status(200).json({ post: fleet, liked: false });
		} else if (req.method === 'DELETE') {
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

			if (fleet.authorId !== currentUser.id && !currentUser.isAdmin) {
				res.status(StatusCodes.UNAUTHORIZED);
				throw new Error('You are not authorized to delete this fleet');
			}

			await prisma.fleet.delete({ where: { id } });

			res.status(StatusCodes.OK).json({ success: true });
		} else {
			res.status(StatusCodes.METHOD_NOT_ALLOWED);
			throw new Error('Method not allowed');
		}
	} catch (error) {
		errorHandler(error, res);
	}
};

export default fleetByIdHandler;
