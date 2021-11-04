import { FormLabel, Textarea as ChakraTextarea, useColorModeValue } from '@chakra-ui/react';
import { Field } from 'formik';
import React from 'react';

interface TextareaProps {
	name: string;
	label: string;
	placeholder?: string;
	disabled?: boolean;
}

export const Textarea = ({ label, name, placeholder, disabled }: TextareaProps) => {
	const bg = useColorModeValue('light', 'dark');

	return (
		<>
			<FormLabel htmlFor={name}>{label}</FormLabel>
			<Field
				as={ChakraTextarea}
				id={name}
				name={name}
				autoComplete='off'
				placeholder={placeholder}
				bg={bg}
				focusBorderColor='brand.500'
				variant='filled'
				resize='none'
				isDisabled={disabled}
			/>
		</>
	);
};
