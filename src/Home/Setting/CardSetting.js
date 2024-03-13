import { Link } from 'react-router-dom'

const CardSetting = ({title, icon, link}) => {
    return (
        <Link to={link}>
            <div className="border-b shadow-md border-[#BA60FE] shadow-[#BA60FE] hover:bg-[#BA60FE] hover:text-white flex items-center p-5 gap-x-3 rounded-xl font-bold text-2xl">
                {icon} {title}
            </div>
        </Link> 
    );
}
 
export default CardSetting;