import { StatusCodes } from "http-status-codes";
import { NextApiHandler } from "next";
import { authorize } from "~lib/middlewares/authorize";
import { errorHandler } from "~lib/middlewares/errorHandler";
import prisma from "~prisma/client";

const infoHandler: NextApiHandler = async (req, res) => {
    const id = parseInt(req.query.id as string);

    try {
        if (req.method === "GET") {
            const { authorized } = await authorize(req);
            if (!authorized) {
                res.status(StatusCodes.FORBIDDEN);
                throw new Error("You are not authorized");
            }

            const user = await prisma.user.findFirst({ where: { id } });
            if (!user) {
                res.status(StatusCodes.BAD_REQUEST);
                throw new Error("User not found");
            }

            res.status(StatusCodes.OK).json({ isAdmin: user.isAdmin });
        } else {
            res.status(StatusCodes.METHOD_NOT_ALLOWED);
            throw new Error("Method not allowed");
        }
    } catch (error) {
        errorHandler(error, res);
    }
};

export default infoHandler;
