const cardAcc = ({titleCard, data, edit, setData}) => {
    if(edit){
        return ( 
            <div className="w-full h-fit self-end bg-white border-b shadow-md border-[#BA60FE] shadow-[#BA60FE] flex items-center px-3 sm:px-4 gap-x-3 rounded-xl">
                <p className='font-bold'>{titleCard} :</p>
                <input type="text" value={data} className="h-full py-3 sm:py-4 grow focus:outline-none" onChange={(e) => {
                    setData(e.target.value)
                }}/>
            </div>
        )
    }
    else{
        return ( 
            <div className="w-full h-fit self-end bg-white border-b shadow-md border-[#BA60FE] shadow-[#BA60FE] flex items-center p-3 sm:p-4 gap-x-3 rounded-xl">
                <p className='font-bold'>{titleCard} : <span className='font-normal'>{data}</span></p>
            </div>
        )
    }
}
 
export default cardAcc;