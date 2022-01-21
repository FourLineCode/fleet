import { User } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { NextApiHandler } from "next";
import { authorize } from "~lib/middlewares/authorize";
import { errorHandler } from "~lib/middlewares/errorHandler";
import prisma from "~prisma/client";

const discoverHandler: NextApiHandler = async (req, res) => {
    try {
        if (req.method === "GET") {
            const { authorized, user: currentUser } = await authorize(req);
            if (!authorized || !currentUser) {
                res.status(StatusCodes.FORBIDDEN);
                throw new Error("You are not authorized");
            }

            const users = await prisma.user.findMany();

            const user = await prisma.user.findFirst({
                where: { id: currentUser.id },
                include: {
                    following: true,
                },
            });
            if (!user) {
                res.status(StatusCodes.BAD_REQUEST);
                throw new Error("User not found");
            }

            const followedUsers = user.following;
            const followedUserIds = followedUsers.map((follow) => follow.toUserId);
            followedUserIds.push(currentUser.id);

            const filteredUsers = users.filter((user) => !followedUserIds.includes(user.id));

            const response: User[] = [];
            for (let i = 0; i < 6; i++) {
                if (!filteredUsers.length) break;
                response.push(
                    filteredUsers.splice(Math.floor(Math.random() * filteredUsers.length), 1)[0]
                );
            }

            res.status(StatusCodes.OK).json(response);
        } else {
            res.status(StatusCodes.METHOD_NOT_ALLOWED);
            throw new Error("Method not allowed");
        }
    } catch (error) {
        errorHandler(error, res);
    }
};

export default discoverHandler;
