import { StatusCodes } from 'http-status-codes';
import { NextApiHandler } from 'next';
import { authorize } from '~lib/middlewares/authorize';
import { errorHandler } from '~lib/middlewares/errorHandler';
import prisma from '~prisma/client';

const homepageHandler: NextApiHandler = async (req, res) => {
	try {
		if (req.method === 'GET') {
			const { authorized, user: currentUser } = await authorize(req);
			if (!authorized || !currentUser) {
				res.status(StatusCodes.FORBIDDEN);
				throw new Error('You are not authorized');
			}

			const followedUsers = await prisma.follow.findMany({
				where: {
					fromUserId: currentUser.id,
				},
				include: {
					fromUser: true,
					toUser: true,
				},
			});

			const followedUserIds = followedUsers.map((follow) => follow.toUser.id);
			followedUserIds.push(currentUser.id);

			const fleets = await prisma.fleet.findMany({
				where: {
					authorId: {
						in: followedUserIds,
					},
				},
				include: {
					author: true,
					likes: true,
					replies: true,
				},
				orderBy: {
					createdAt: 'desc',
				},
			});

			const responseFleets = fleets.map((fleet) => {
				for (const like of fleet.likes) {
					if (like.userId === currentUser.id) {
						return { post: fleet, liked: true };
					}
				}
				return { post: fleet, liked: false };
			});

			res.status(StatusCodes.OK).json(responseFleets);
		} else {
			res.status(StatusCodes.METHOD_NOT_ALLOWED);
			throw new Error('Method not allowed');
		}
	} catch (error) {
		errorHandler(error, res);
	}
};

export default homepageHandler;
