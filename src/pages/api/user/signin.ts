import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { NextApiHandler } from "next";
import { errorHandler } from "~lib/middlewares/errorHandler";
import { createCookie } from "~lib/utils/createCookie";
import { signToken } from "~lib/utils/jwt";
import { signinShema } from "~lib/validation/signinSchema";
import prisma from "~prisma/client";

const signinHandler: NextApiHandler = async (req, res) => {
    try {
        if (req.method === "POST") {
            try {
                signinShema.validateSync(req.body);
            } catch (error) {
                res.status(StatusCodes.BAD_REQUEST);
                throw error;
            }

            const { email, password } = req.body;

            const user = await prisma.user.findFirst({
                where: {
                    email: email.toLowerCase(),
                },
            });
            if (!user) {
                res.status(StatusCodes.BAD_REQUEST);
                throw new Error("User not found");
            }

            const validated = await bcrypt.compare(password, user.password);

            if (!validated) {
                res.status(StatusCodes.FORBIDDEN);
                throw new Error("Invalid credentials");
            }

            const payload = {
                id: user.id,
                username: user.username,
                displayName: user.displayName,
            };

            const token = signToken({ payload, age: "24h", type: "AUTH" });
            const refreshToken = signToken({ payload, age: "1y", type: "REFRESH" });

            res.setHeader("Set-Cookie", [
                createCookie({ name: "auth-token", value: token, age: 1 }),
                createCookie({ name: "refresh-token", value: refreshToken, age: 365 }),
            ]);

            res.status(StatusCodes.OK).json({
                success: true,
                id: user.id,
                token,
                refreshToken,
            });
        } else {
            res.status(StatusCodes.METHOD_NOT_ALLOWED);
            throw new Error("Method not allowed");
        }
    } catch (error) {
        errorHandler(error, res);
    }
};

export default signinHandler;
