import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import { NextApiHandler } from 'next';
import prisma from '~/prisma/client';
import { signupShema } from '~/src/lib/validation/signupSchema';

const signupHandler: NextApiHandler = async (req, res) => {
	if (req.method === 'POST') {
		try {
			signupShema.validateSync(req.body);
		} catch (error) {
			res.status(StatusCodes.BAD_REQUEST).json(error);
			return;
		}

		const { email, password, username, displayName, bio } = req.body;

		const emailExists = await prisma.user.findFirst({
			where: {
				email: email.toLowerCase(),
			},
		});
		if (emailExists) {
			res.status(StatusCodes.BAD_REQUEST).json({
				error: 'User already exists with given email',
			});
			return;
		}

		const usernameExists = await prisma.user.findFirst({
			where: {
				username: username.toLowerCase(),
			},
		});
		if (usernameExists) {
			res.status(StatusCodes.BAD_REQUEST).json({
				error: 'User already exists with given username',
			});
			return;
		}

		const user = await prisma.user.create({
			data: {
				email: email.toLowerCase(),
				password: await bcrypt.hash(password, 10),
				username: username.toLowerCase(),
				displayName,
				bio: bio || '',
			},
		});

		res.status(StatusCodes.OK).json(user);
	} else {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).json({ error: 'Method not allowed' });
	}
};

export default signupHandler;
