import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchEngine from './components/SearchEngine'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
	
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
				gcTime: 1000 * 60 * 60 //30 minutes
			}
		}
	})

	return (
		<QueryClientProvider client={queryClient}>
			<SearchEngine/>
		</QueryClientProvider>
	)
}

export default App
