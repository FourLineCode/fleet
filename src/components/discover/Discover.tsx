import { Stack, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { UserType } from "src/shared/types";
import { UserInfoCard } from "~components/user/UserInfoCard";
import { ApiClient } from "~config/ApiClient";
import { Card } from "../../ui/Card";

export const Discover = () => {
    const hide = useBreakpointValue({ base: true, md: false });
    const bgColor = useColorModeValue("light-muted", "dark-muted");

    const { data } = useQuery<UserType[]>("discover", async () => {
        const res = await ApiClient.get("/search/discover");
        return res.data;
    });

    return (
        <Card hidden={hide} w="xs" h="100vh" bg={bgColor}>
            <Stack>
                <Text>People you may know</Text>
                {data && data.map((user) => <UserInfoCard user={user} key={user.id} />)}
            </Stack>
        </Card>
    );
};
