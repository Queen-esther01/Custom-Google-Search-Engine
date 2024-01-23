import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getSearch } from "../api/getSearch"

export const useFetchData = (searchTerm: string) => {
    
    return useQuery({ 
        queryKey: ['todos', searchTerm], 
        queryFn: () => getSearch(searchTerm),
        enabled: !!searchTerm,
        staleTime: 1000 * 60 * 30, //30 minutes
        gcTime: 1000 * 60 * 60, //30 minutes
        placeholderData: keepPreviousData
        //enabled: false
    })
}