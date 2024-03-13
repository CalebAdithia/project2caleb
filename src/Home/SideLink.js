import {NavLink} from 'react-router-dom'

const SideLink = ({link, icons, title, closeSide}) => {
    return ( 
        <NavLink to={link} className={({isActive}) =>
            isActive ? "active bg-[#BA60FE] w-full text-white" : "w-full"    
        }>
            <div id='close' className="hover:bg-[#BA60FE] hover:text-white duration-200 p-3 px-8 flex items-center gap-x-2" onClick={closeSide}>{icons} {title}</div>
        </NavLink>
     );
}
 
export default SideLink;