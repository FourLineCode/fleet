import { Checkbox, Flex } from '@chakra-ui/react';
import { Field } from 'formik';
import React from 'react';

interface CheckboxProps {
	defaultChecked?: boolean;
	label: string;
	name: string;
	disabled?: boolean;
}

export const CheckboxPrompt = ({
	label,
	name,
	defaultChecked = false,
	disabled,
}: CheckboxProps) => {
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
				isDisabled={disabled}
			>
				{label}
			</Field>
		</Flex>
	);
};
