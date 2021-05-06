import { StatusCodes } from 'http-status-codes';
import { NextApiHandler } from 'next';
import { authorize } from '~lib/middlewares/authorize';
import { errorHandler } from '~lib/middlewares/errorHandler';
import { replySchema } from '~lib/validation/replySchema';
import prisma from '~prisma/client';

const replyHandler: NextApiHandler = async (req, res) => {
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

			try {
				replySchema.validateSync(req.body);
			} catch (error) {
				res.status(StatusCodes.BAD_REQUEST);
				throw error;
			}

			const reply = await prisma.reply.create({
				data: {
					body: req.body.body,
					fleetId: id,
					userId: currentUser.id,
				},
			});

			res.status(StatusCodes.OK).json(reply);
		} else if (req.method === 'DELETE') {
			const { authorized, user: currentUser } = await authorize(req);
			if (!authorized || !currentUser) {
				res.status(StatusCodes.FORBIDDEN);
				throw new Error('You are not authorized');
			}

			const reply = await prisma.reply.findFirst({ where: { id } });
			if (!reply) {
				res.status(StatusCodes.BAD_REQUEST);
				throw new Error('Reply not found');
			}

			if (reply.userId !== currentUser.id && !currentUser.isAdmin) {
				res.status(StatusCodes.UNAUTHORIZED);
				throw new Error('You are not authorized to delete this reply');
			}

			await prisma.reply.delete({ where: { id } });

			res.status(StatusCodes.OK).json({ success: true });
		} else {
			res.status(StatusCodes.METHOD_NOT_ALLOWED);
			throw new Error('Method not allowed');
		}
	} catch (error) {
		errorHandler(error, res);
	}
};

export default replyHandler;
