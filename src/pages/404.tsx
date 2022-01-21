import { useColorModeValue } from "@chakra-ui/color-mode";
import Icon from "@chakra-ui/icon";
import { Text, VStack } from "@chakra-ui/layout";
import { FaFrown, FaRegFrown } from "react-icons/fa";
import { Layout } from "~components/layouts/Layout";

const ErrorPage = () => {
    const NotFoundIcon = useColorModeValue(FaRegFrown, FaFrown);

    return (
        <Layout title="Not Found" desc="Requested page not found">
            <VStack w="full" h="100vh" display="flex" justifyContent="center" alignItems="center">
                <Icon as={NotFoundIcon} boxSize="24" color="text-muted" />
                <Text fontSize="4xl" fontWeight="extrabold" color="text-muted">
                    404 | Not Found
                </Text>
            </VStack>
        </Layout>
    );
};

export default ErrorPage;
