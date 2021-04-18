import { StatusCodes } from 'http-status-codes';
import { NextApiHandler } from 'next';

const hello: NextApiHandler = (req, res) => {
	res.status(StatusCodes.OK).json({ msg: 'Hello' });
};

export default hello;
