import axios from "axios"


export const getSearch = async(searchTerm:string):Promise<any> => {
    const url = new URL(`${import.meta.env.VITE_BASE_URL}?key=${import.meta.env.VITE_API_KEY}&cx=${import.meta.env.VITE_SEARCH_ID}`)

    if(searchTerm !== ''){
        url.searchParams.set('q', searchTerm)
    }

    const parsedUrl = url.toString()


    //await axios.get(`${parsedUrl}`)
    try {
        //const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/bulbasaur`)
        const response = await axios.get(`${parsedUrl}`)
        return response.data
    } catch (error) {
        throw new Error(error as string)
    }
    // .then((response) =>  {
    //     console.log(response.data)
    //     return response.data
    // })
    // .catch(({ message }) => {
    //     console.log(message)
    //     throw new Error(message)
        
    // })
}