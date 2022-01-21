import { Icon, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { Layout } from "~components/layouts/Layout";

export const ErrorFallback = () => {
    return (
        <Layout title="Error" desc="Something went wrong!">
            <VStack w="full" h="100vh" display="flex" justifyContent="center" alignItems="center">
                <Icon as={FaExclamationCircle} boxSize="24" color="text-muted" />
                <Text fontSize="4xl" fontWeight="extrabold" color="text-muted">
                    Something went wrong!
                </Text>
            </VStack>
        </Layout>
    );
};
