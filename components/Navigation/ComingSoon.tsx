import { ClockIcon } from '../../ui/icons/ClockIcon'

interface Props {
	feature: string
}

export const ComingSoon = ({ feature }: Props) => {
	return (
		<div className='flex flex-col items-center justify-center h-full col-span-3 text-gray-500 border-r border-dark-500 md:border-l'>
			<ClockIcon className='w-20 h-20' />
			<h1 className='text-4xl font-semibold'>{feature} Coming Soon</h1>
		</div>
	)
}
