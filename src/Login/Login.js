import { FaStore } from "react-icons/fa6";
import { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'
import axios from "axios";
import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import {useDispatch} from 'react-redux'
import { loginUser } from "../Redux/userSlice";

const Login = ({setToken, setUser, setSide, setGlobalDetail}) => {
    const [pending, setPending] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setPending(true)
        const response = await dispatch(loginUser({username, password}))
        if(response.payload.token && response.payload.user){
            setToken(response.payload.token)
            setUser(response.payload.user)
            setPending(false)
            navigate("/products");
        }
    }
    
    useEffect(() => {
        setSide(false)
        setGlobalDetail(false)
    },[])

    return (
        <>
            <div className="Login flex justify-center bg-[#BA60FE] items-center h-screen">
                <div className="Card flex flex-col items-center justify-center gap-5 bg-white p-5 w-full h-full sm:h-fit sm:rounded-3xl  sm:p-10 sm:w-3/5 md:w-2/5">
                    <div className="flex items-center text-8xl"><FaStore className="pb-2  text-[#BA60FE] sm:pb-3"></FaStore> <span className="text-6xl">Log In</span></div>
                    
                    {error && (<p className="text-red-700 font-bold">Username atau Password yang Anda Masukkan Salah</p>)}
                    <form onSubmit={handleSubmit} className="flex flex-col items-start gap-3 w-full">
                        <div className="flex flex-col items-start w-full">
                            <label htmlFor="Username" className="text-xl">Username : </label>
                            {error ? <input type="text" name="Username" id="Username" placeholder="Username" className="w-full rounded-2xl p-3 border border-red-500 focus:outline-none focus:ring focus:ring-red-500" required onChange={(e) => setUsername(e.target.value)}/>
                            :<input type="text" name="Username" id="Username" placeholder="Username" className="w-full rounded-2xl p-3 border border-[#BA60FE] focus:outline-none focus:ring focus:ring-[#BA60FE]" required onChange={(e) => setUsername(e.target.value)}/>}
                        </div>
                        <div className="flex flex-col items-start w-full">
                            <label htmlFor="Password" className="text-xl">Password : </label>
                            {error ? <input type="password" name="Password" id="Password" placeholder="Password" className="w-full rounded-2xl p-3 border border-red-500 focus:outline-none focus:ring focus:ring-red-500" required onChange={(e) => setPassword(e.target.value)}/> 
                            : <input type="password" name="Password" id="Password" placeholder="Password" className="w-full rounded-2xl p-3 border border-[#BA60FE] focus:outline-none focus:ring focus:ring-[#BA60FE]" required onChange={(e) => setPassword(e.target.value)}/>}
                        </div>
                        {!pending && (<button type="submit" className="bg-[#BA60FE] rounded-xl hover:bg-indigo-500 w-1/2 p-3 text-xl text-white self-center">Login</button>)}
                        {pending && <CircularProgress className="self-center"/>}
                    </form>
                </div>
            </div>
        </>
     );
}
 
export default Login;
