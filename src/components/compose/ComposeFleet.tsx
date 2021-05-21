import {
	Avatar,
	Box,
	Button,
	Stack,
	Text,
	Textarea,
	useBreakpointValue,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React, { useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import { queryClient } from 'src/shared/queryClient';
import { ApiClient } from '~config/ApiClient';
import { useCurrentUser } from '~store/useCurrentUser';
import { toastProps } from '~theme/theme';
import { Card } from '~ui/Card';

export const ComposeFleet = () => {
	const user = useCurrentUser();
	const toast = useToast();
	const bg = useColorModeValue('light', 'dark');
	const textColor = useColorModeValue('dark', 'light');
	const avatarSize = useBreakpointValue({
		base: 'sm',
		md: 'md',
	});
	const [body, setBody] = useState('');
	const lengthColor = useMemo(() => {
		if (body.length >= 200 && body.length < 240) {
			return 'yellow.500';
		} else if (body.length >= 240) {
			return 'red.500';
		}
		return textColor;
	}, [body, textColor]);

	const { mutate, isLoading } = useMutation(
		async () => {
			const res = await ApiClient.post('/fleet', { body });
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
			onSuccess: () => {
				toast({
					title: 'Fleet sent',
					status: 'success',
					...toastProps,
				});
				setBody('');
				queryClient.invalidateQueries('fleet-timeline');
			},
		}
	);

	return (
		<Card w='100%'>
			<Stack display='flex' direction='row'>
				<Box>
					<Avatar size={avatarSize} src={user.avatarURL} />
				</Box>
				<Formik
					initialValues={{ body: '' }}
					onSubmit={async () => {
						mutate();
					}}
				>
					<Stack as={Form} w='100%'>
						<Field
							mt='0'
							as={Textarea}
							id='body'
							name='body'
							bg={bg}
							focusBorderColor='brand.500'
							variant='filled'
							resize='none'
							autoComplete='off'
							placeholder='share a status...'
							value={body}
							isDisabled={isLoading}
							onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
								setBody(e.target.value)
							}
						/>
						<Box display='flex' justifyContent='space-between'>
							{/* TODO: Add emoji picker */}
							<Text>
								<Text as='span' color={lengthColor}>
									{body.length}{' '}
								</Text>
								<Text as='span'>/ 240</Text>
							</Text>
							<Button colorScheme='brand' type='submit' isLoading={isLoading}>
								Send Fleet
							</Button>
						</Box>
					</Stack>
				</Formik>
			</Stack>
		</Card>
	);
};
