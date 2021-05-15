import { Stack } from '@chakra-ui/react';
import React from 'react';
import { ComposeFleet } from '~components/compose/ComposeFleet';
import { FleetData, FleetTimeline } from '~components/timeline/FleetTimeline';

interface Props {
	fleets: FleetData[];
}

export const Timeline = ({ fleets }: Props) => {
	return (
		<Stack flex='1'>
			<ComposeFleet />
			<FleetTimeline initialData={fleets} />
		</Stack>
	);
};
