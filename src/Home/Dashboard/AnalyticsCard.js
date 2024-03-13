const AnalyticsCard = ({icons, data, title, unit}) => {
    return ( 
        <div className="border-b shadow-md border-[#BA60FE] shadow-[#BA60FE] flex items-center p-5 gap-x-3 rounded-xl">
            {icons}
            <div className="flex flex-col">
                <p className='font-bold'>{title}</p>
                <p>{data} {unit}</p>
            </div>
        </div>
    );
}
 
export default AnalyticsCard;