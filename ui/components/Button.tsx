import clsx from 'clsx';
import React from 'react';

interface Props {
	type?: 'button' | 'submit' | 'reset';
	variant?: 'filled' | 'outlined' | 'danger';
	disabled?: boolean;
	className?: string;
	onClick?: (arg?: any) => void;
	children: React.ReactNode;
	danger?: boolean;
}

const VariantStyles: Record<string, string> = {
	filled: 'bg-brand-500 hover:bg-brand-600 hover:border-transparent text-white',
	outlined: 'bg-transparent hover:bg-brand-500 hover:bg-opacity-30 text-black dark:text-white',
	danger: 'bg-red-500 hover:bg-red-600 hover:border-transparent text-white',
};

export const Button = React.forwardRef<HTMLButtonElement, Props>(
	({ type, variant = 'filled', disabled = false, onClick, danger = false, children, className }, ref) => {
		return (
			<button
				ref={ref}
				disabled={disabled}
				onClick={onClick}
				type={type}
				className={clsx(
					className,
					VariantStyles[variant],
					disabled
						? 'cursor-not-allowed border-dark-600 text-gray-500 bg-transparent'
						: danger
						? 'border-red-500 ring-red-700'
						: 'border-brand-500 ring-brand-700',
					'px-4 py-2 font-semibold rounded-lg focus:outline-none focus:ring-4 ring-opacity-50 border-2 '
				)}
			>
				{children}
			</button>
		);
	}
);
