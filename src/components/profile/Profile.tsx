import { Stack } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { UserType } from "src/shared/types";
import { ProfileBanner } from "~components/profile/ProfileBanner";
import { ApiClient } from "~config/ApiClient";

interface Props {
    user?: UserType;
}

export const Profile = ({ user }: Props) => {
    const router = useRouter();
    const { id } = router.query;

    const { data } = useQuery<UserType>(
        `profile-user-${id}`,
        async () => {
            const res = await ApiClient.get(`/user/info/${id}`);
            return res.data;
        },
        {
            initialData: user,
        }
    );

    return (
        <Stack flex="1">
            {data && (
                <Stack w="100%">
                    <ProfileBanner user={data} />
                </Stack>
            )}
        </Stack>
    );
};
