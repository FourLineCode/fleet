import { StatusCodes } from "http-status-codes";
import { NextApiHandler } from "next";
import { authorize } from "~lib/middlewares/authorize";
import { errorHandler } from "~lib/middlewares/errorHandler";
import { fleetSchema } from "~lib/validation/fleetSchema";
import prisma from "~prisma/client";

const fleetHandler: NextApiHandler = async (req, res) => {
    try {
        if (req.method === "GET") {
            const { authorized } = await authorize(req);
            if (!authorized) {
                res.status(StatusCodes.FORBIDDEN);
                throw new Error("You are not authorized");
            }

            const fleets = await prisma.fleet.findMany({
                include: {
                    author: true,
                    likes: true,
                    replies: true,
                },
            });

            res.status(StatusCodes.OK).json(fleets);
        } else if (req.method === "POST") {
            const { authorized, user: currentUser } = await authorize(req);
            if (!authorized || !currentUser) {
                res.status(StatusCodes.FORBIDDEN);
                throw new Error("You are not authorized");
            }

            try {
                fleetSchema.validateSync(req.body);
            } catch (error) {
                res.status(StatusCodes.BAD_REQUEST);
                throw error;
            }

            const fleet = await prisma.fleet.create({
                data: {
                    body: req.body.body,
                    authorId: currentUser.id,
                },
                include: {
                    author: true,
                },
            });

            res.status(StatusCodes.OK).json(fleet);
        } else {
            res.status(StatusCodes.METHOD_NOT_ALLOWED);
            throw new Error("Method not allowed");
        }
    } catch (error) {
        errorHandler(error, res);
    }
};

export default fleetHandler;
