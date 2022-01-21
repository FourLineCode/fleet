import {
    Button,
    Checkbox,
    Container,
    Flex,
    Heading,
    Link,
    Spinner,
    Text,
    useBoolean,
    useBreakpointValue,
    useColorModeValue,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Terms } from "~components/info/Terms";
import { Layout } from "~components/layouts/Layout";
import { useAuth } from "~store/useAuth";
import { toastProps } from "~theme/theme";
import { Input } from "~ui/Input";
import { Textarea } from "~ui/Textarea";

const SignUp = () => {
    const auth = useAuth();
    const toast = useToast();
    const router = useRouter();
    const [agreed, setAgreed] = useBoolean();
    const [redirecting, setRedirecting] = useBoolean();
    const padding = useBreakpointValue({ base: "8", md: "12", lg: "16" });
    const marginTop = useBreakpointValue({ base: "4", md: "12", lg: "20" });
    const bg = useColorModeValue("light-muted", "dark-muted");
    const spinnerSize = useBreakpointValue({ sm: "lg", md: "xl" });

    useEffect(() => {
        return () => {
            setRedirecting.off();
        };
    }, []);

    if (redirecting) {
        return (
            <Layout title="Sign In" desc="Sign In Page">
                <Flex as="div" w="100vw" h="100vh" alignItems="center" justify="center">
                    <Spinner size={spinnerSize} color="brand.500" thickness="3px" />
                </Flex>
            </Layout>
        );
    }

    return (
        <Layout title="Sign Up" desc="Sign Up Page">
            <VStack>
                <Formik
                    initialValues={{
                        email: "",
                        username: "",
                        displayName: "",
                        password: "",
                        confirmPassword: "",
                        bio: "",
                    }}
                    onSubmit={async (values) => {
                        if (values.password !== values.confirmPassword) {
                            toast({
                                title: "Passwords do not match",
                                status: "error",
                                ...toastProps,
                            });
                            return;
                        }

                        const { success, message } = await auth.signup(values);

                        if (success) {
                            setRedirecting.on();
                            toast({
                                title: message,
                                status: "success",
                                ...toastProps,
                            });
                            router.push("/home");
                        } else {
                            toast({
                                title: message,
                                status: "error",
                                ...toastProps,
                            });
                        }
                    }}
                >
                    {(props) => (
                        <Container
                            as={Form}
                            bg={bg}
                            pt="8"
                            px={padding}
                            pb={padding}
                            mt={marginTop}
                            rounded="lg"
                            shadow="lg"
                        >
                            <Heading p="2" textAlign="center" as="h1" size="xl">
                                Sign Up
                            </Heading>
                            <Input
                                name="email"
                                type="email"
                                placeholder="example@example.com ..."
                                label="Email address"
                                disabled={props.isSubmitting}
                            />
                            <Input
                                name="username"
                                type="text"
                                placeholder="username ..."
                                label="Username"
                                disabled={props.isSubmitting}
                            />
                            <Input
                                name="displayName"
                                type="text"
                                placeholder="your name ..."
                                label="Display Name"
                                disabled={props.isSubmitting}
                            />
                            <Input
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                label="Password"
                                disabled={props.isSubmitting}
                            />
                            <Input
                                name="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                label="Confirm Password"
                                disabled={props.isSubmitting}
                            />
                            <Textarea
                                name="bio"
                                placeholder="about yourself ..."
                                label="Bio"
                                disabled={props.isSubmitting}
                            />
                            <Flex mt="2">
                                <Checkbox
                                    checked={agreed}
                                    onInput={setAgreed.toggle}
                                    colorScheme="brand"
                                    borderColor="gray.500"
                                    mr="1"
                                    isDisabled={props.isSubmitting}
                                >
                                    Accept our
                                </Checkbox>
                                <Terms />
                            </Flex>
                            <Button
                                mt="2"
                                colorScheme="brand"
                                type="submit"
                                isFullWidth
                                isLoading={props.isSubmitting}
                                disabled={!agreed || props.isSubmitting}
                            >
                                Sign Up
                            </Button>
                            <Flex justify="center" mt="2">
                                <Text>Already have an account?</Text>
                                <NextLink passHref href="/signin">
                                    <Text
                                        fontWeight="semibold"
                                        as={Link}
                                        color="brand.500"
                                        ml="2"
                                        cursor="pointer"
                                    >
                                        Sign in
                                    </Text>
                                </NextLink>
                            </Flex>
                        </Container>
                    )}
                </Formik>
            </VStack>
        </Layout>
    );
};

export default SignUp;
