import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

export const SocialLinks = () => {
    return (
        <Flex justify="space-evenly" w="full" pt="1">
            <IconButton
                icon={<FaTwitter />}
                aria-label="twitter"
                size="xs"
                isRound
                color="white"
                bg="twitter.500"
                _hover={{ bg: "twitter.700" }}
                as="a"
                href="http://twitter.com/FourLineCode"
                target="_blank"
            />
            <IconButton
                icon={<FaInstagram />}
                aria-label="instagram"
                size="xs"
                isRound
                color="white"
                bgGradient="linear(to-r, red.500, purple.500)"
                _hover={{ bgGradient: "linear(to-r, red.700, purple.700)" }}
                as="a"
                href="http://instagram.com/FourLineCode"
                target="_blank"
            />
            <IconButton
                icon={<FaFacebookF />}
                aria-label="facebook"
                size="xs"
                isRound
                color="white"
                bg="facebook.500"
                _hover={{ bg: "facebook.700" }}
                as="a"
                href="http://facebook.com/FourLineCode"
                target="_blank"
            />
            <IconButton
                icon={<FaGithub />}
                aria-label="github"
                size="xs"
                isRound
                color="white"
                bg="gray.900"
                _hover={{ bg: "gray.800" }}
                as="a"
                href="http://github.com/FourLineCode"
                target="_blank"
            />
        </Flex>
    );
};
