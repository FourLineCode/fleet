import { FormLabel, Textarea as ChakraTextarea } from '@chakra-ui/react';
import { Field } from 'formik';
import React from 'react';

interface TextareaProps {
	name: string;
	label: string;
	placeholder?: string;
}

export const Textarea = ({ label, name, type, placeholder }: TextareaProps) => {
	return (
		<>
			<FormLabel htmlFor={name}>{label}</FormLabel>
			<Field
				as={ChakraTextarea}
				id={name}
				name={name}
				autoComplete='off'
				placeholder={placeholder}
				focusBorderColor='brand.500'
				variant='filled'
				resize='none'
			/>
		</>
	);
};
