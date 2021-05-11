import { Icon, Stack, Text, useToast, VStack } from '@chakra-ui/react';
import React from 'react';
import { FaInbox } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { FleetType } from 'src/shared/types';
import { Fleet } from '~components/fleet/Fleet';
import { TimelineSuspense } from '~components/suspense/TimelineSuspense';
import { ApiClient } from '~config/ApiClient';
import { toastProps } from '~theme/theme';

interface FleetData {
	post: FleetType;
	liked: boolean;
}

export const FleetTimeline = () => {
	const toast = useToast();

	const { data, isLoading } = useQuery<FleetData[]>(
		'fleet-timeline',
		async () => {
			const res = await ApiClient.get('/fleet/homepage');
			return res.data;
		},
		{
			onError: (error: any) => {
				toast({
					title: error.response.data.message || 'Unknown error occured',
					status: 'error',
					...toastProps,
				});
			},
		}
	);

	if (isLoading) {
		return <TimelineSuspense />;
	}

	return (
		<Stack>
			{data && data.length > 0 ? (
				data.map((fleet) => (
					<Fleet fleet={fleet.post} liked={fleet.liked} key={fleet.post.id} />
				))
			) : (
				<VStack w='full' pt='24'>
					<Icon as={FaInbox} boxSize='24' color='text-muted' />
					<Text fontSize='4xl' fontWeight='extrabold' color='text-muted'>
						No Fleet Found
					</Text>
				</VStack>
			)}
		</Stack>
	);
};
