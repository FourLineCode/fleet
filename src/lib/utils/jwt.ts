import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export type TokenType = "AUTH" | "REFRESH";
export type TokenAge = "24h" | "1y";

interface SignTokenParams {
    payload: Record<string, string | number | boolean>;
    age: TokenAge;
    type: TokenType;
}

interface ValidateTokenParams {
    token: string;
    type: TokenType;
}

const SECRETS: Record<TokenType, string> = {
    AUTH: process.env.JWT_SECRET || "secret",
    REFRESH: process.env.JWT_REFRESH_SECRET || "secret",
};

export const signToken = ({ payload, age, type }: SignTokenParams) => {
    const secret = SECRETS[type];

    return jwt.sign(payload, secret, {
        expiresIn: age,
    });
};

export const verifyToken = ({ token, type }: ValidateTokenParams): User => {
    return jwt.verify(token, SECRETS[type]) as User;
};
