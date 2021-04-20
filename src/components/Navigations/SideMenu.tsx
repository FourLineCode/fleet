import {
	Avatar,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	HStack,
	IconButton,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { FaBars } from 'react-icons/fa';

export const SideMenu = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const menuRef = React.useRef(null);

	return (
		<>
			<IconButton
				ref={menuRef}
				onClick={onOpen}
				icon={<FaBars />}
				aria-label='Menu'
				variant='ghost'
			/>
			<Drawer isOpen={isOpen} placement='left' onClose={onClose} finalFocusRef={menuRef}>
				<DrawerOverlay>
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerBody p='2'>
							<DrawerHeader p='0'>
								<HStack spacing='2'>
									<Avatar />
									<Flex direction='column'>
										<Text fontSize='md'>Akmal Hossain</Text>
										<Text fontSize='sm' color='text-muted'>
											@akmal
										</Text>
									</Flex>
								</HStack>
							</DrawerHeader>
						</DrawerBody>
					</DrawerContent>
				</DrawerOverlay>
			</Drawer>
		</>
	);
};
