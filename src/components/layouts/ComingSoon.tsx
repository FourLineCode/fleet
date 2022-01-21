import { Icon, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { FaClock } from "react-icons/fa";

export const ComingSooon = () => {
    return (
        <VStack w="full" h="100vh" display="flex" justifyContent="center" alignItems="center">
            <Icon as={FaClock} boxSize="24" color="text-muted" />
            <Text fontSize="4xl" fontWeight="extrabold" color="text-muted">
                Coming Soon
            </Text>
        </VStack>
    );
};
