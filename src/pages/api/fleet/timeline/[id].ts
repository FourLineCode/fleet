import { StatusCodes } from "http-status-codes";
import { NextApiHandler } from "next";
import { authorize } from "~lib/middlewares/authorize";
import { errorHandler } from "~lib/middlewares/errorHandler";
import prisma from "~prisma/client";

const timelineHandler: NextApiHandler = async (req, res) => {
    const id = parseInt(req.query.id as string);

    try {
        if (req.method === "GET") {
            const { authorized, user: currentUser } = await authorize(req);
            if (!authorized || !currentUser) {
                res.status(StatusCodes.FORBIDDEN);
                throw new Error("You are not authorized");
            }

            const user = await prisma.user.findFirst({
                where: { id },
                include: {
                    fleets: {
                        include: {
                            likes: true,
                            author: true,
                            replies: true,
                        },
                        orderBy: {
                            createdAt: "desc",
                        },
                    },
                },
            });

            if (!user) {
                res.status(StatusCodes.BAD_REQUEST);
                throw new Error("User not found");
            }

            const responseFleets = user.fleets.map((fleet) => {
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
            throw new Error("Method not allowed");
        }
    } catch (error) {
        errorHandler(error, res);
    }
};

export default timelineHandler;
