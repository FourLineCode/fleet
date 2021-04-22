import { FormLabel, Input as ChakraInput, useColorModeValue } from '@chakra-ui/react';
import { Field } from 'formik';
import React from 'react';

interface InputProps {
	name: string;
	type: string;
	label: string;
	placeholder?: string;
}

export const Input = ({ label, name, type, placeholder }: InputProps) => {
	const bg = useColorModeValue('light', 'dark');

	return (
		<>
			<FormLabel htmlFor={name}>{label}</FormLabel>
			<Field
				as={ChakraInput}
				id={name}
				name={name}
				type={type}
				autoComplete='off'
				placeholder={placeholder}
				bg={bg}
				focusBorderColor='brand.500'
				variant='filled'
			/>
		</>
	);
};
