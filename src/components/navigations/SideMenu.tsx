import {
	Avatar,
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
	Icon,
	IconButton,
	Text,
	Tooltip,
	useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import {
	FaBars,
	FaCog,
	FaCommentAlt,
	FaGithub,
	FaHome,
	FaShieldAlt,
	FaSignInAlt,
	FaUser,
	FaUserPlus,
} from 'react-icons/fa';
import { SocialLinks } from '~components/info/SocialLinks';
import { Navlink } from '~components/navigations/NavLink';
import { useAuth } from '~store/useAuth';
import { useCurrentUser } from '~store/useCurrentUser';

export const SideMenu = () => {
	const auth = useAuth();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const menuRef = React.useRef(null);

	return (
		<>
			<Tooltip label='Side Menu'>
				<IconButton
					ref={menuRef}
					onClick={onOpen}
					icon={<FaBars />}
					aria-label='Menu'
					variant='ghost'
				/>
			</Tooltip>
			<Drawer isOpen={isOpen} placement='left' onClose={onClose} finalFocusRef={menuRef}>
				<DrawerOverlay>
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerHeader p='2'>
							<Text>Account Info</Text>
						</DrawerHeader>
						<Divider />
						<DrawerBody p='2'>
							{auth.authorized ? <SignedInUserInfo /> : <SignedOutUserInfo />}
							<Divider />
							<Flex direction='column' p='2'>
								{auth.authorized ? <SignedInLinks /> : <SignedOutLinks />}
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
							<Center p='2' flexDirection='column' w='75%'>
								<Text color='text-muted'>@FourLineCode</Text>
								<SocialLinks />
							</Center>
						</DrawerFooter>
					</DrawerContent>
				</DrawerOverlay>
			</Drawer>
		</>
	);
};

const SignedInUserInfo = () => {
	const user = useCurrentUser();

	return (
		<>
			<HStack p='2' spacing='2'>
				<Avatar src={user.avatarURL} />
				<Flex direction='column'>
					<Text fontSize='md' fontWeight='semibold' display='flex' alignItems='center'>
						{user.displayName}
						{user.isAdmin && <Icon color='brand.500' as={FaShieldAlt} ml='2' />}
					</Text>
					<Text fontSize='sm' color='text-muted'>
						@{user.username}
					</Text>
				</Flex>
			</HStack>
			<HStack spacing='4' pb='2' px='2'>
				<Text>
					<b>{user.followers?.length}</b> followers
				</Text>
				<Text>
					<b>{user.following?.length}</b> following
				</Text>
			</HStack>
		</>
	);
};

const SignedOutUserInfo = () => {
	return (
		<Text textAlign='center' fontSize='md' fontWeight='semibold' p='2' pb='4'>
			You are not signed in!
		</Text>
	);
};

const SignedInLinks = () => {
	return (
		<>
			<Navlink href='/home' label='Home' icon={FaHome} />
			<Navlink href='/profile' label='Profile' icon={FaUser} />
			<Navlink href='/messages' label='Messages' icon={FaCommentAlt} />
			<Navlink href='/settings' label='Settings' icon={FaCog} />
		</>
	);
};

const SignedOutLinks = () => {
	return (
		<>
			<Navlink href='/signin' label='Sign In' icon={FaSignInAlt} />
			<Navlink href='/signup' label='Sign Up' icon={FaUserPlus} />
		</>
	);
};
