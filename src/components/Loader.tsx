

const Loader = ({ classname }:{ classname?: string}) => {
    return (
        <div className={`${ classname } h-8 flex items-center justify-center text-slate-500 `}> 
            <div className={`w-8 h-8 border-2 border-lightGray border-t-2 border-t-blue-400 rounded-full animate-spin`}></div>
        </div>
    )
}

export default Loader