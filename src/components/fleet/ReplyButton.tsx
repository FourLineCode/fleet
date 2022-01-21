import { IconButton, Stack, Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { GoComment } from "react-icons/go";
import { ComposeReply } from "~components/compose/ComposeReply";

interface Props {
    id: number;
    count: number;
}

export const ReplyButton = ({ id, count }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Tooltip label="Reply" isDisabled={isOpen}>
            <Stack display="flex" direction="row" alignItems="center" spacing="0.5">
                <IconButton
                    icon={<GoComment />}
                    aria-label="reply-button"
                    bg="transparent"
                    isRound
                    size="sm"
                    onClick={onOpen}
                />
                <ComposeReply id={id} isOpen={isOpen} onClose={onClose} />
                <Text>{count}</Text>
            </Stack>
        </Tooltip>
    );
};
