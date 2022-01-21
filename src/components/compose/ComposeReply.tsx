import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    Textarea,
    useColorModeValue,
    useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useMemo, useRef, useState } from "react";
import { useMutation } from "react-query";
import { queryClient } from "src/shared/queryClient";
import { ApiClient } from "~config/ApiClient";
import { toastProps } from "~theme/theme";

interface Props {
    id: number;
    isOpen: boolean;
    onClose: () => void;
}

export const ComposeReply = ({ id, isOpen, onClose }: Props) => {
    const toast = useToast();
    const bg = useColorModeValue("light", "dark");
    const textColor = useColorModeValue("dark", "light");
    const [body, setBody] = useState("");
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const lengthColor = useMemo(() => {
        if (body.length >= 200 && body.length < 240) {
            return "yellow.500";
        } else if (body.length >= 240) {
            return "red.500";
        }
        return textColor;
    }, [body, textColor]);

    const { mutate, isLoading } = useMutation(
        async () => {
            const res = await ApiClient.post(`/fleet/reply/${id}`, { body });
            return res.data;
        },
        {
            onError: (error: any) => {
                toast({
                    title: error.response.data.message || "Unknown error occured",
                    status: "error",
                    ...toastProps,
                });
            },
            onSuccess: () => {
                toast({
                    title: "Reply sent",
                    status: "success",
                    ...toastProps,
                });
                setBody("");
                onClose();
                queryClient.invalidateQueries("fleet-timeline");
                queryClient.invalidateQueries(`fleet-view-${id}`);
            },
        }
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl" initialFocusRef={inputRef}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Reply</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Formik
                        initialValues={{ body: "" }}
                        onSubmit={async () => {
                            mutate();
                        }}
                    >
                        <Stack as={Form} w="100%">
                            <Field
                                as={Textarea}
                                mt="0"
                                id="body"
                                name="body"
                                bg={bg}
                                focusBorderColor="brand.500"
                                variant="filled"
                                resize="none"
                                autoComplete="off"
                                placeholder="share a status..."
                                value={body}
                                isDisabled={isLoading}
                                onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                    setBody(e.target.value)
                                }
                            />
                            <Box display="flex" justifyContent="space-between">
                                <Text>
                                    <Text as="span" color={lengthColor}>
                                        {body.length}{" "}
                                    </Text>
                                    <Text as="span">/ 240</Text>
                                </Text>
                                <Button colorScheme="brand" type="submit" isLoading={isLoading}>
                                    Reply
                                </Button>
                            </Box>
                        </Stack>
                    </Formik>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
