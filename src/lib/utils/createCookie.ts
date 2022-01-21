import cookie from "cookie";

interface CreateCookieInput {
    name: string;
    value: string;
    age: number;
}

export const createCookie = ({ name, value, age }: CreateCookieInput) => {
    return cookie.serialize(name, value, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: age * 60 * 60 * 24,
        path: "/",
    });
};
