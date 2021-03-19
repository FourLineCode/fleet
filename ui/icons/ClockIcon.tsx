import IconProps from './iconProps'

const ClockIcon = ({ className }: IconProps) => (
	<svg className={className} xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
		<path
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={2}
			d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
		/>
	</svg>
)

export default ClockIcon
