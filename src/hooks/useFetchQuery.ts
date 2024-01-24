import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getSearch } from "../api/getSearch"

export const useFetchData = (searchTerm: string, language: string) => {
    
    return useQuery({ 
        queryKey: ['todos', searchTerm, language], 
        queryFn: () => getSearch(searchTerm, language),
        enabled: !!searchTerm && !!language,
        staleTime: 1000 * 60 * 30, //30 minutes
        gcTime: 1000 * 60 * 60, //30 minutes
        placeholderData: keepPreviousData
        //enabled: false
    })
}