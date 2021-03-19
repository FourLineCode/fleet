import { ProtectedLayout } from '../../components/Layouts/ProtectedLayout'
import { ComingSoon } from '../../components/Navigation/ComingSoon'
import { Menu } from '../../components/Navigation/Menu'

const Search = () => {
	return (
		<ProtectedLayout title='Search'>
			<div className='grid min-h-screen grid-cols-4 bg-light dark:bg-dark-800 gap-x-1 xl:gap-x-4'>
				<Menu />
				{/* <SearchResult />
				<Recommend /> */}
				<ComingSoon feature='Search' />
			</div>
		</ProtectedLayout>
	)
}

export default Search
