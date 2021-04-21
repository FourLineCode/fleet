import {
	Avatar,
	Box,
	Center,
	Divider,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	HStack,
	IconButton,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { FaBars, FaCog, FaCommentAlt, FaGithub, FaHome, FaShieldAlt, FaUser } from 'react-icons/fa';
import { Navlink } from '~/components/Navigations/NavLink';

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
						<DrawerHeader p='2'>
							<Text>Account Info</Text>
						</DrawerHeader>
						<Divider />
						<DrawerBody p='2'>
							<HStack p='2' spacing='2'>
								<Avatar />
								<Flex direction='column'>
									<Text
										fontSize='md'
										fontWeight='semibold'
										display='flex'
										alignItems='center'
									>
										Akmal Hossain
										<Box as={FaShieldAlt} ml='2' />
									</Text>
									<Text fontSize='sm' color='text-muted'>
										@akmal
									</Text>
								</Flex>
							</HStack>
							<HStack spacing='4' pb='2' px='2'>
								<Text>
									<b>23</b> followers
								</Text>
								<Text>
									<b>46</b> following
								</Text>
							</HStack>
							<Divider />
							<Flex direction='column' p='2'>
								<Navlink href='/home' label='Home' icon={FaHome} />
								<Navlink href='/profile' label='Profile' icon={FaUser} />
								<Navlink href='/messages' label='Messages' icon={FaCommentAlt} />
								<Navlink href='/settings' label='Settings' icon={FaCog} />
							</Flex>
						</DrawerBody>
						<DrawerFooter flexDirection='column' justifyContent='start' w='full' p='2'>
							<Navlink
								href='http://github.com/FourLineCode/fleet'
								label='GitHub'
								icon={FaGithub}
								newTab
							/>
							<Divider mt='2' />
							<Center p='2'>
								<Text color='text-muted'>@FourLineCode</Text>
							</Center>
						</DrawerFooter>
					</DrawerContent>
				</DrawerOverlay>
			</Drawer>
		</>
	);
};
