import { Flex, Spinner, useBreakpointValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Layout } from "~components/layouts/Layout";
import { useAuth } from "~store/useAuth";

const Profile = () => {
    const auth = useAuth();
    const router = useRouter();
    const spinnerSize = useBreakpointValue({ sm: "lg", md: "xl" });

    useEffect(() => {
        if (process.browser && auth.authorized) {
            router.push(`/profile/${auth.id}`);
        }
    }, [auth]);

    return (
        <Layout authorized title="Profile" desc="Profile Page">
            <Flex as="div" w="100vw" h="100vh" alignItems="center" justify="center">
                <Spinner size={spinnerSize} color="brand.500" thickness="3px" />
            </Flex>
        </Layout>
    );
};

export default Profile;
