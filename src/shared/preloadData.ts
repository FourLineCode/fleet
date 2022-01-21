import { GetServerSidePropsContext } from "next";
import { AppContext } from "next/app";
import { ApiClient } from "~config/ApiClient";

export const preloadAppData = async (url: string, context: AppContext) => {
    return await ApiClient.get(url, {
        headers: {
            // @ts-ignore
            Cookie: Object.entries(context.ctx.req.cookies)
                .map(([key, value]) => `${key}=${value}`)
                .join("; "),
        },
    });
};

export const preloadData = async (url: string, context: GetServerSidePropsContext) => {
    try {
        const res = await ApiClient.get(url, {
            headers: {
                Cookie: Object.entries(context.req.cookies)
                    .map(([key, value]) => `${key}=${value}`)
                    .join("; "),
            },
        });

        return res.data;
    } catch (error) {
        // TODO: handle unauthorized error
        return null;
    }
};
