import { BaseLayout, LayoutProps } from './BaseLayout';

export const Layout = ({ children, title, desc }: LayoutProps) => {
	return (
		<BaseLayout title={title} desc={desc}>
			{children}
		</BaseLayout>
	);
};
