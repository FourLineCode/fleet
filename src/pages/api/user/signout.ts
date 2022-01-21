import { StatusCodes } from "http-status-codes";
import { NextApiHandler } from "next";
import { authorize } from "~lib/middlewares/authorize";
import { errorHandler } from "~lib/middlewares/errorHandler";
import { createCookie } from "~lib/utils/createCookie";

const signoutHandler: NextApiHandler = async (req, res) => {
    try {
        if (req.method === "POST") {
            const { authorized } = await authorize(req);
            if (!authorized) {
                res.status(StatusCodes.FORBIDDEN);
                throw new Error("You are not authorized");
            }

            const token = req.cookies["auth-token"];
            const refreshToken = req.cookies["refresh-token"];

            if (!token && !refreshToken) {
                res.status(StatusCodes.FORBIDDEN);
                throw new Error("You are not signed in");
            }

            res.setHeader("Set-Cookie", [
                createCookie({ name: "auth-token", value: "", age: -1 }),
                createCookie({ name: "refresh-token", value: "", age: -1 }),
            ]);

            res.status(StatusCodes.OK).json({ success: true });
        } else {
            res.status(StatusCodes.METHOD_NOT_ALLOWED);
            throw new Error("Method not allowed");
        }
    } catch (error) {
        errorHandler(error, res);
    }
};

export default signoutHandler;
