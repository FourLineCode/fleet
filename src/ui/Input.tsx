import { FormLabel, Input as ChakraInput } from '@chakra-ui/react';
import { Field } from 'formik';
import React from 'react';

interface InputProps {
	name: string;
	type: string;
	label: string;
	placeholder?: string;
}

export const Input = ({ label, name, type, placeholder }: InputProps) => {
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
				focusBorderColor='brand.500'
				variant='filled'
			/>
		</>
	);
};
