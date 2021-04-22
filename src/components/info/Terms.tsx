import {
	Button,
	Divider,
	Heading,
	Link,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

export const Terms = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Link onClick={onOpen} fontWeight='semibold' color='brand.500'>
				Terms and Conditions
			</Link>
			<Modal isOpen={isOpen} onClose={onClose} isCentered size='3xl'>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader fontSize='4xl' color='brand.500'>
						Fleet Terms & Conditions
					</ModalHeader>
					<ModalCloseButton />
					{/* TODO: update actual terms */}
					<ModalBody overflowY='auto' maxH='lg'>
						<Heading as='h1' size='md' color='brand.500'>
							1. Who May Use the Services
						</Heading>
						<Text>
							You may use the Services only if you agree to form a binding contract
							with Fleet and are not a person barred from receiving services under the
							laws of the applicable jurisdiction. In any case, you must be at least
							13 years old, to use the Services. If you are accepting these Terms and
							using the Services on behalf of a company, organization, government, or
							other legal entity, you represent and warrant that you are authorized to
							do so and have the authority to bind such entity to these Terms, in
							which case the words “you” and “your” as used in these Terms shall refer
							to such entity.
						</Text>
						<Divider my='4' />
						<Heading as='h1' size='md' color='brand.500'>
							2. Privacy
						</Heading>
						<Text>
							Our Privacy Policy describes how we handle the information you provide
							to us when you use our Services. You understand that through your use of
							the Services you consent to the collection and use (as set forth in the
							Privacy Policy) of this information, including the transfer of this
							information to the other countries for storage, processing and use by
							Fleet and its affiliates.
						</Text>
						<Divider my='4' />
						<Heading as='h1' size='md' color='brand.500'>
							3. Content on the Services
						</Heading>
						<Text>
							You are responsible for your use of the Services and for any Content you
							provide, including compliance with applicable laws, rules, and
							regulations. You should only provide Content that you are comfortable
							sharing with others.
						</Text>
						<Text>
							Any use or reliance on any Content or materials posted via the Services
							or obtained by you through the Services is at your own risk. We do not
							endorse, support, represent or guarantee the completeness, truthfulness,
							accuracy, or reliability of any Content or communications posted via the
							Services or endorse any opinions expressed via the Services. You
							understand that by using the Services, you may be exposed to Content
							that might be offensive, harmful, inaccurate or otherwise inappropriate,
							or in some cases, postings that have been mislabeled or are otherwise
							deceptive. All Content is the sole responsibility of the person who
							originated such Content. We may not monitor or control the Content
							posted via the Services and, we cannot take responsibility for such
							Content.
						</Text>
						<Text>
							We reserve the right to remove Content that violates the User Agreement,
							including for example, copyright or trademark violations or other
							intellectual property misappropriation, impersonation, unlawful conduct,
							or harassment.
						</Text>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='brand' mr={3} onClick={onClose}>
							I Agree
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
