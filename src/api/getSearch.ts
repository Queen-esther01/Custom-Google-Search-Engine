import axios from "axios"


export const getSearch = async(searchTerm:string, language: string):Promise<any> => {
    const url = new URL(`${import.meta.env.VITE_BASE_URL}?key=${import.meta.env.VITE_API_KEY}&cx=${import.meta.env.VITE_SEARCH_ID}`)

    if(searchTerm !== ''){
        url.searchParams.set('q', searchTerm)
    }

    if(language !== ''){
        url.searchParams.set('lr', language)
    }

    const parsedUrl = url.toString()

    return await axios.get(`${parsedUrl}`)
    
    .then((response) =>  {
        console.log(response.data)
        return response.data
    })
    .catch(({ message }) => {
        console.log(message)
        throw new Error(message)
        
    })
}