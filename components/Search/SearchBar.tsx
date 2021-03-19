import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { SearchIcon } from '../../ui/icons/SearchIcon'

export const SearchBar = () => {
	const router = useRouter()
	const ref = useRef<HTMLInputElement>(null)
	const searchQuery = router.query.query as string

	const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formData = new FormData(event.target)
		const query = formData.get('query')

		router.push(`/search?query=${query}`)
		ref.current?.blur()
	}

	const onFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.target.select()
	}

	useEffect(() => {
		if (searchQuery && ref.current) {
			ref.current.value = searchQuery
		}
	}, [])

	return (
		<form onSubmit={onSubmit} className='hidden md:block'>
			<div className='relative'>
				<SearchIcon className='absolute top-0 left-0 w-8 h-full p-1 text-gray-400 border-r border-gray-500' />
				<input
					ref={ref}
					type='text'
					name='query'
					onFocus={onFocus}
					className='w-48 py-1 pr-2 text-black transition-all border border-gray-500 rounded-lg pl-9 focus:w-72 dark:bg-gray-700 dark:text-white focus:ring-4 ring-brand-500 focus:outline-none'
					placeholder='Search...'
					autoComplete='off'
				/>
			</div>
		</form>
	)
}
