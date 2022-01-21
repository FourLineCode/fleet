import { StatusCodes } from "http-status-codes";
import { NextApiHandler } from "next";
import { authorize } from "~lib/middlewares/authorize";
import { errorHandler } from "~lib/middlewares/errorHandler";
import prisma from "~prisma/client";

const userHandler: NextApiHandler = async (req, res) => {
    try {
        if (req.method === "GET") {
            const { authorized } = await authorize(req);
            if (!authorized) {
                res.status(StatusCodes.FORBIDDEN);
                throw new Error("You are not authorized");
            }

            const users = await prisma.user.findMany({
                include: {
                    fleets: true,
                    followers: true,
                    following: true,
                    likes: true,
                    replies: true,
                },
            });

            res.status(StatusCodes.OK).json(users);
        } else {
            res.status(StatusCodes.METHOD_NOT_ALLOWED);
            throw new Error("Method not allowed");
        }
    } catch (error) {
        errorHandler(error, res);
    }
};

export default userHandler;
