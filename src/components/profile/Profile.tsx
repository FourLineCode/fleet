import { Code, Stack } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { UserType } from 'src/shared/types';
import { ApiClient } from '~config/ApiClient';
import { Card } from '~ui/Card';

interface Props {
	user?: UserType;
}

export const Profile = ({ user }: Props) => {
	const router = useRouter();
	const { id } = router.query;

	const { data } = useQuery<UserType>(
		'profile-user',
		async () => {
			const res = await ApiClient.get(`/user/info/${id}`);
			return res.data;
		},
		{
			initialData: user,
		}
	);

	return (
		<Stack flex='1'>
			{data && (
				<Card>
					<Code children={JSON.stringify(data, null, 4)} />
				</Card>
			)}
		</Stack>
	);
};
