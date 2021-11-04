import {
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Tooltip,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { FaEllipsisV, FaExternalLinkAlt, FaTrash } from 'react-icons/fa';
import { useMutation } from 'react-query';
import { queryClient } from 'src/shared/queryClient';
import { ApiClient } from '~config/ApiClient';
import { toastProps } from '~theme/theme';
import { ConfirmModal } from '~ui/ConfirmModal';

interface Props {
	id: number;
	canDelete: boolean;
}

export const FleetOptions = ({ id, canDelete }: Props) => {
	const router = useRouter();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { mutate } = useMutation(
		async () => {
			const res = await ApiClient.delete(`/fleet/${id}`);
			return res.data;
		},
		{
			onSuccess: () => {
				toast({
					title: 'Deleted fleet successfully ',
					status: 'success',
					...toastProps,
				});
				queryClient.invalidateQueries('fleet-timeline');

				if (router.pathname.startsWith('/fleet')) {
					router.push('/home');
				}
			},
			onError: () => {
				toast({
					title: 'An unknown error has occured',
					status: 'error',
					...toastProps,
				});
			},
		}
	);
	return (
		<Menu placement='bottom-end'>
			<Tooltip label='Options' isDisabled={isOpen}>
				<MenuButton
					as={IconButton}
					aria-label='Options'
					icon={<FaEllipsisV />}
					rounded='full'
					size='sm'
					bg='transparent'
				/>
			</Tooltip>
			<MenuList>
				{canDelete && (
					<>
						<MenuItem icon={<FaTrash />} color='red.500' onClick={onOpen}>
							Delete
						</MenuItem>
						<ConfirmModal
							title='Delete Fleet?'
							body='Are you sure? You can`t undo this action afterwards.'
							action='Delete'
							isOpen={isOpen}
							onClose={onClose}
							onConfirm={mutate}
						/>
					</>
				)}
				<MenuItem
					as='a'
					href={`/fleet/${id}`}
					target='_blank'
					icon={<FaExternalLinkAlt />}
					_hover={{ color: 'brand.500' }}
				>
					Open on new window
				</MenuItem>
			</MenuList>
		</Menu>
	);
};
