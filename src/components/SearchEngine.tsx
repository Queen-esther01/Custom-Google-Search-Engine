import  { useEffect, useState, useRef, RefObject } from 'react'
// import results from './data.json'
import { useFetchData } from '../hooks/useFetchQuery'
import { SearchItem } from '../types/search'
import Loader from './Loader'
import Languages from './Languages'

const SearchEngine = () => {

    const inputRef: RefObject<HTMLInputElement> = useRef(null)

    const [ searchTerm, setSearchTerm ] = useState('')
    const [ language, setLanguage ] = useState('lang_en')
    const [ requestsLimit, setRequestsLimit ] = useState(false)

    const { data:results, error, isError, isLoading, isFetching } = useFetchData(searchTerm, language)


    useEffect(() => {
        if(isError && error?.message.includes('429')){
            setRequestsLimit(true)
            setTimeout(() => {
                window.location.reload()
            }, 3000);
        }
    }, [isError])
    

    let debouncedSearch: number | undefined 
    const handleSearch = (e:{ target: { value: string }}) => {
        clearTimeout(debouncedSearch)
        debouncedSearch = setTimeout(() => {
            setSearchTerm(e.target.value)
        }, 2000);
    }

    const clearInput = () => {
        setSearchTerm('')
        inputRef.current!.value = ''
    }


    return (
        <div>
            {
                searchTerm === '' && !results && !requestsLimit &&
                <div className='h-[80vh] flex flex-col gap-8 justify-center items-center md:px-0'>
                    <h1 className='text-white text-5xl lg:text-7xl'>Noogle</h1>
                    <div className='w-full lg:w-1/2 lg:max-w-xl px-6  flex items-center relative'>
                        <input onChange={handleSearch} type='text' className=' rounded-3xl text-white border-[0.5px] border-slate-200 cursor-pointer bg-transparent w-full  px-10 py-3 hover:bg-slate-500 hover:border-slate-500 focus:bg-slate-500 focus:border-slate-500 outline-none'/>
                        { isFetching && <Loader classname='absolute right-2'/> }
                    </div>
                    <div className='flex gap-3'>
                        <div className='bg-slate-700 text-sm border-[0.5px] border-slate-700 hover:border-[0.5px] hover:border-slate-200 text-white rounded-md px-5 py-2 cursor-pointer'><span>Noogle Search</span></div>
                        <div className='bg-slate-700 text-sm border-[0.5px] border-slate-700 hover:border-[0.5px] hover:border-slate-200 text-white rounded-md px-5 py-2 cursor-pointer'><span><a href='https://doodles.google' target="_blank">I'm Feeling Lucky</a></span></div>
                    </div>
                    <Languages setLanguage={setLanguage}  language={language}/>
                </div>
            }
            {
                requestsLimit &&
                <div className='h-[80vh] flex flex-col gap-8 justify-center items-center text-slate-500'>
                    <h2 className='text-5xl'>Too Many Requests!</h2>
                    <p>The search quota for today is exhausted.</p>
                </div>
            }
            {
                results! && !requestsLimit && !isLoading &&
                <div>
                    <div className='px-5 md:px-20 lg:px-24'>
                        <div className='flex items-center gap-5 lg:gap-10 '>
                            <h2 className='text-white text-xl lg:text-3xl mb-10 mt-8'>Noogle</h2>
                            <div className='lg:w-1/2 lg:max-w-xl flex items-center relative'>
                                <input ref={inputRef} defaultValue={searchTerm} onChange={handleSearch} type='text' className=' rounded-3xl text-white border-[0.5px]  cursor-pointer bg-transparent w-full  px-10 py-2 lg:py-3 bg-slate-500 border-slate-500 focus:bg-slate-500 focus:border-slate-500 outline-none'/>
                                {
                                    searchTerm !== '' && !isFetching && <span onClick={clearInput} className='absolute right-5 text-white font-medium cursor-pointer'>x</span>
                                }
                            </div>
                        </div>
                        <Languages setLanguage={setLanguage}  language={language}/>
                    </div>
                    <hr className='border-t-[0.5px] border-t-slate-500 mt-4'/>
                    <div className='px-5 md:px-20 lg:px-60'>
                        <p className='text-slate-500 text-sm my-4'>About { results?.searchInformation?.formattedTotalResults } results ({results?.searchInformation?.formattedSearchTime} seconds)</p>
                        {
                            results?.spelling?.htmlCorrectedQuery &&
                            <div className='text-slate-400'>
                                <p className='font-medium'>Showing results for <span className='text-blue-500 cursor-pointer' onClick={() => setSearchTerm(results?.spelling?.htmlCorrectedQuery)} dangerouslySetInnerHTML={{__html: results?.spelling?.htmlCorrectedQuery}}/></p>
                                <p className='text-sm'>Search instead for <span className='text-blue-500 cursor-pointer' onClick={() => setSearchTerm(results?.spelling?.htmlCorrectedQuery)} >{ results?.queries?.request[0].searchTerms }</span></p>
                            </div>
                        }
                    </div>
                    <hr className='border-t-[0.5px] border-t-slate-500 mt-5'/>
                    <div className='px-5 md:px-20 lg:px-60 my-10 max-w-sm md:max-w-2xl lg:max-w-6xl'>
                        {
                            results?.items && results?.items.map((result: SearchItem) => (
                                <div key={result.cacheId} className=' py-7' >
                                    <div className=''>
                                        <a href={result.formattedUrl} target='_blank'>
                                            <div className='flex items-center gap-3 cursor-pointer '>
                                                {result?.pagemap?.cse_thumbnail?.length && <img src={result?.pagemap?.cse_thumbnail[0]?.src} width={100} className='object-contain'/>}
                                                <div>
                                                    <p className='text-slate-400 text-sm font-medium'>{ result.displayLink }</p>
                                                    <p className='text-slate-400 text-sm break-all text-wrap'>{ result.formattedUrl }</p>
                                                </div>
                                            </div>
                                            <h3 className='text-blue-500 cursor-pointer pt-3' dangerouslySetInnerHTML={{__html: result.htmlTitle }}/>
                                        </a>
                                        <p className='text-slate-400 mt-2' dangerouslySetInnerHTML={{__html: result.htmlSnippet }} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default SearchEngine