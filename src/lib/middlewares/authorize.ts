import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";
import prisma from "~prisma/client";

interface Authorized {
    authorized: boolean;
    user: User | null;
}

export const authorize = async (req: NextApiRequest): Promise<Authorized> => {
    try {
        const token = req.cookies["auth-token"];

        if (!token) {
            return { authorized: false, user: null };
        }

        const validated = jwt.verify(token, process.env.JWT_SECRET || "secret") as User;
        if (!validated) {
            return { authorized: false, user: null };
        }

        const currentUser = await prisma.user.findFirst({
            where: { id: validated.id },
        });

        return { authorized: true, user: currentUser };
    } catch (error) {
        return { authorized: false, user: null };
    }
};
