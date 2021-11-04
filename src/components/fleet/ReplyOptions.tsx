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
import React from 'react';
import { FaEllipsisV, FaTrash } from 'react-icons/fa';
import { useMutation } from 'react-query';
import { queryClient } from 'src/shared/queryClient';
import { ApiClient } from '~config/ApiClient';
import { toastProps } from '~theme/theme';
import { ConfirmModal } from '~ui/ConfirmModal';

interface Props {
	id: number;
	fleetId: number;
	canDelete: boolean;
}

export const ReplyOptions = ({ id, fleetId, canDelete }: Props) => {
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { mutate } = useMutation(
		async () => {
			const res = await ApiClient.delete(`/fleet/reply/${id}`);
			return res.data;
		},
		{
			onSuccess: () => {
				toast({
					title: 'Deleted reply successfully ',
					status: 'success',
					...toastProps,
				});
				queryClient.invalidateQueries('fleet-timeline');
				queryClient.invalidateQueries(`fleet-view-${fleetId}`);
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
							title='Delete Reply?'
							body='Are you sure? You can`t undo this action afterwards.'
							action='Delete'
							isOpen={isOpen}
							onClose={onClose}
							onConfirm={mutate}
						/>
					</>
				)}
			</MenuList>
		</Menu>
	);
};
