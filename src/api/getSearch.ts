import axios, { AxiosError, AxiosPromise } from "axios"
import { SearchResult } from "../types/search"


export const getSearch = async(searchTerm:string):Promise<any> => {
    const url = new URL(`${import.meta.env.VITE_BASE_URL}?key=${import.meta.env.VITE_API_KEY}&cx=${import.meta.env.VITE_SEARCH_ID}`)

    if(searchTerm !== ''){
        url.searchParams.set('q', searchTerm)
    }

    const parsedUrl = url.toString()


    await axios.get(`${parsedUrl}`)
    .then((response) => {
        return response.data
    })
    .catch(({ message }) => {
        console.log(message)
        throw new Error(message)
        
    })
}