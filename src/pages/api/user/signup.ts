import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import { NextApiHandler } from 'next';
import { signupShema } from '~lib/validation/signupSchema';
import prisma from '~prisma/client';

const signupHandler: NextApiHandler = async (req, res) => {
	if (req.method === 'POST') {
		try {
			signupShema.validateSync(req.body);
		} catch (error) {
			res.status(StatusCodes.BAD_REQUEST).json(error);
			return;
		}

		const { email, password, username, displayName, bio } = req.body;

		const exists = await prisma.user.findFirst({
			where: {
				OR: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
			},
		});
		if (exists) {
			const field = exists.email === email.toLowerCase() ? 'email' : 'username';

			res.status(StatusCodes.BAD_REQUEST).json({
				message: `User already exists with given ${field}`,
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
		res.status(StatusCodes.METHOD_NOT_ALLOWED).json({ message: 'Method not allowed' });
	}
};

export default signupHandler;
