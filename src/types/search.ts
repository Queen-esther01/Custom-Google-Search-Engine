export type SearchItem = {
    displayLink: string, 
    pagemap: { 
        cse_thumbnail: { 
            src: string 
        }[]
    } , 
    cacheId: React.Key; 
    formattedUrl: string; 
    htmlTitle: string; 
    htmlSnippet: string
}
export type SearchResult = { 
    queries: {
        request: {
            searchTerms: string
        }[]
    }
    spelling: {
        htmlCorrectedQuery: string
    }
    searchInformation: {
        formattedTotalResults: string
        formattedSearchTime: string
    }
    items: SearchItem[]
}