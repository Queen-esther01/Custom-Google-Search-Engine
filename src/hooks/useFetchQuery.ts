import { useQuery } from '@tanstack/react-query'
import { getSearch } from "../api/getSearch"
import { SearchResult } from '../types/search'

export const useFetchData = (searchTerm: string) => {
    
    const { data, isLoading, isError, error } = useQuery({ 
        queryKey: ['todos', searchTerm], 
        queryFn: () => getSearch(searchTerm),
        enabled: !!searchTerm
        //enabled: false
    })

    return { data, isLoading, isError, error }
}