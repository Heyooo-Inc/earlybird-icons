import { StrictMode, Suspense, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'

import './style.css'
import { IconList } from './IconList'
import { SearchBar } from './SearchBar'

const App = () => {
	const [type, setType] = useState<string>('line')
	const [query, setQuery] = useState<string>()

	return (
		<StrictMode>
			<Suspense fallback={<>Oops, Something went wrong</>}>
				<div className="font-sans px-5 md:px-0 max-w-[1280px] mx-auto">
					<div className="py-8">
						<a href="/" className="text-2xl">EarlyBird Icons</a>
					</div>
					<SearchBar type={type} onTypeChange={setType} onQueryChange={setQuery} />
					<IconList type={type} query={query} />
				</div>

				<Toaster />
			</Suspense>
		</StrictMode>
	)
}

createRoot(document.getElementById('app')!).render(<App />)