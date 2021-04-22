import { Checkbox, Flex, Text } from '@chakra-ui/react';
import { Field } from 'formik';
import React from 'react';

interface CheckboxProps {
	defaultChecked?: boolean;
	label: string;
	name: string;
}

export const CheckboxPrompt = ({ label, name, defaultChecked = false }: CheckboxProps) => {
	return (
		<Flex mt='2'>
			<Field
				as={Checkbox}
				id={name}
				name={name}
				borderColor='gray.500'
				defaultChecked={defaultChecked}
				colorScheme='brand'
				mr='2'
			/>
			<Text>{label}</Text>
		</Flex>
	);
};
