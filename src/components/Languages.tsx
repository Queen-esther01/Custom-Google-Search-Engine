import { languages } from "../data/languages"


const Languages = ({ setLanguage, language}: { setLanguage: (value: string) => void, language: string}) => {
    
    return (
        <div className='flex  gap-3 text-white text-sm'>
            <p>Noogle offered in:</p> 
            {
                languages.map(value => (
                    <span onClick={() => setLanguage(value.code)} className={`${language === value.code ? 'text-blue-500' : 'text-blue-200'} cursor-pointer`}>
                        { value.title }
                    </span> 
                ))
            }
        </div>
    )
}

export default Languages