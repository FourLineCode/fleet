import { useDisclosure } from '@chakra-ui/react'
import React from 'react'
import FleetComposer from '../Fleet/FleetComposer'
import BottomMenu from './BottomMenu'
import VerticalMenu from './VerticalMenu'

const Menu = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<>
			<VerticalMenu onOpen={onOpen} />
			<BottomMenu onOpen={onOpen} />
			<FleetComposer isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
		</>
	)
}

export default Menu
