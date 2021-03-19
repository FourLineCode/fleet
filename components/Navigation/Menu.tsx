import { useDisclosure } from '@chakra-ui/react'
import { FleetComposer } from '../Fleet/FleetComposer'
import { BottomMenu } from './BottomMenu'
import { VerticalMenu } from './VerticalMenu'

export const Menu = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<>
			<VerticalMenu onOpen={onOpen} />
			<BottomMenu onOpen={onOpen} />
			<FleetComposer isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
		</>
	)
}
