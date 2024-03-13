import {useNavigate, Link} from 'react-router-dom'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { FaStore } from "react-icons/fa6";
import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SideLink from './SideLink';

const SideBar = ({setSide, setToken, setUser, openSide}) => {
    const closeSide = (e) => {
        if(e.target.id === 'close'){
            setSide(false)
        }
    }

    const navigate = useNavigate();
    const handleLogout = () => {
        setToken('')
        setUser('')
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/")
    }

    return (
        <>
            <div className="SideBar w-fit text-start bg-[#CF91FF] text-lg pt-5 hidden md:flex">
                <div className="flex flex-col items-start h-full">
                    <div className="logo self-center mb-2 border-b border-[#CF91FF]">
                        <Link to={`/dashboard`}><FaStore className="text-5xl text-white"></FaStore></Link>
                    </div>
                    <SideLink link={'/dashboard'} icons={<DashboardOutlinedIcon/>} title={'DASHBOARD'}></SideLink>
                    <SideLink link={'/products'} icons={<Inventory2OutlinedIcon/>} title={'PRODUCTS'}></SideLink>
                    <SideLink link={'/inbox'} icons={<InboxOutlinedIcon/>} title={'INBOX'}></SideLink>
                    <SideLink link={'/setting'} icons={<SettingsOutlinedIcon/>} title={'SETTING'}></SideLink>
                </div>
            </div>
            
            <div id="close" className={`SideBar fixed top-0 left-0 z-10 min-h-screen w-full text-start bg-black/50 text-lg md:hidden transition-all duration-500 ease-in-out ${openSide ? 'bg-black/50 flex' : 'hidden'}`} onClick={closeSide}>
            </div>

            <div className={`flex flex-col fixed top-0 left-0 z-10  w-full sm:w-fit pt-5 items-start min-h-screen md:hidden bg-[#CF91FF] transition-all duration-500 ease-in-out ${openSide ? '-translate-x-0 flex' : '-translate-x-full'}`}>
                <div className="logo self-center border-b mb-2 border-[#CF91FF]">
                    <Link to={'/dashboard'}><FaStore className="text-5xl text-white"></FaStore></Link>
                </div>
                <button id="close" className=" p-2 absolute right-4 sm:hidden" onClick={closeSide}>
                    <CloseIcon id="close" fontSize='large'></CloseIcon>
                </button>
                <SideLink link={'/dashboard'} icons={<DashboardOutlinedIcon/>} title={'DASHBOARD'} closeSide={closeSide}></SideLink>
                <SideLink link={'/products'} icons={<Inventory2OutlinedIcon/>} title={'PRODUCTS'} closeSide={closeSide}></SideLink>
                <SideLink link={'/inbox'} icons={<InboxOutlinedIcon/>} title={'INBOX'} closeSide={closeSide}></SideLink>
                <SideLink link={'/setting'} icons={<SettingsOutlinedIcon/>} title={'SETTING'} closeSide={closeSide}></SideLink>
                <button className="self-center my-10 px-8 py-1 bg-black text-white border border-black rounded-lg hover:bg-[#BA60FE] hover:text-white" onClick={handleLogout}>Logout</button>
            </div>
        </>
     );
}
 
export default SideBar;