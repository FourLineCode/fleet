import { useRouter } from 'next/router';
import { useAuthorization } from '../../hooks/useAuthorization';
import { BaseLayout, LayoutProps } from './BaseLayout';

export const ProtectedLayout = ({ children, title, desc }: LayoutProps) => {
	const router = useRouter();
	const { signedIn } = useAuthorization();

	if (!signedIn && process.browser) {
		router.push('/signin?redirect=true');
	}

	return (
		<BaseLayout title={title} desc={desc}>
			{children}
		</BaseLayout>
	);
};
