import clsx from 'clsx';

interface Props {
	className?: string;
	onClick?: () => void;
	children: React.ReactNode;
}

export const IconButton = ({ className, onClick, children }: Props) => {
	return (
		<button className={clsx(className, 'p-1 focus:outline-none')} onClick={onClick}>
			{children}
		</button>
	);
};
