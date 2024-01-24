import React from 'react'

const Languages = ({ setLanguage, language}: { setLanguage: (value: string) => void, language: string}) => {
    const languages = [
        {
            title: 'English',
            code: 'lang_en'
        },
        {
            title: 'French',
            code: 'lang_fr'
        },
        {
            title: 'German',
            code: 'lang_de'
        },
    ]
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