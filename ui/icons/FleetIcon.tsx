import React from 'react'
import IconProps from './iconProps'

export const fleetIconURL = 'https://i.ibb.co/vZmHrm2/fleet-cropped.png'

const FleetIcon = ({ className }: IconProps) => <img className={className} src={fleetIconURL} alt='brand-icon' />

export default FleetIcon
