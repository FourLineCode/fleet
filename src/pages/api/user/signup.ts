import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { NextApiHandler } from "next";
import { errorHandler } from "~lib/middlewares/errorHandler";
import { signupShema } from "~lib/validation/signupSchema";
import prisma from "~prisma/client";

const signupHandler: NextApiHandler = async (req, res) => {
    try {
        if (req.method === "POST") {
            try {
                signupShema.validateSync(req.body);
            } catch (error) {
                res.status(StatusCodes.BAD_REQUEST);
                throw error;
            }

            const { email, password, username, displayName, bio } = req.body;

            const exists = await prisma.user.findFirst({
                where: {
                    OR: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
                },
            });
            if (exists) {
                const field = exists.email === email.toLowerCase() ? "email" : "username";

                res.status(StatusCodes.BAD_REQUEST);
                throw new Error(`User already exists with given ${field}`);
            }

            const user = await prisma.user.create({
                data: {
                    email: email.toLowerCase(),
                    password: await bcrypt.hash(password, 10),
                    username: username.toLowerCase(),
                    displayName,
                    bio: bio || "",
                },
            });

            res.status(StatusCodes.OK).json(user);
        } else {
            res.status(StatusCodes.METHOD_NOT_ALLOWED);
            throw new Error("Method not allowed");
        }
    } catch (error) {
        errorHandler(error, res);
    }
};

export default signupHandler;
