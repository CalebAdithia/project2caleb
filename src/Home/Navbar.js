import {useNavigate} from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({user, setToken, setUser, setSide}) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        setToken('')
        setUser('')
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/")
    }

    const handleSide = () => {
        setSide(true)
    }

    return ( 
        <>
            <div className="py-3 Navbar flex flex-row sticky top-0 bg-white md:top-auto justify-between md:justify-end items-center px-5 md:px-10 text-black border-b border-grey-500">
                <button className='md:hidden' onClick={handleSide}><MenuIcon></MenuIcon></button>
                {user.name && (
                    <div className="right-navbar flex flex-row gap-2 items-center text-lg">
                        <p>Welcome, <span className="text-[#BA60FE] font-bold">{user.name.firstname} {user.name.lastname}</span></p>
                        <button className="px-2 py-1 border border-[#BA60FE] rounded-lg hover:bg-[#BA60FE] hover:text-white hidden sm:block" onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>
        </>
    );
}

export default Navbar;