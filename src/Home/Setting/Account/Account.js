import CardAcc from "./CardAcc";
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import {Link} from 'react-router-dom'
import {Context} from '../..//../Context'
import { useContext, useDebugValue, useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { setIdleUser, updateUser } from "../../../Redux/userSlice";

const Account = () => {
    const {user, setAlert} = useContext(Context);
    const dispatch = useDispatch()
    const updateStatus = useSelector(state => state.user.statusUpdate)
    const [toggleEdit, setToggleEdit] = useState(false)
    const [firstname, setFirstName] = useState(user.name.firstname)
    const [lastname, setLastName] = useState(user.name.lastname)
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone)
    const [street, setStreet] = useState(user.address.street)
    const [number, setNumber] = useState(user.address.number)
    const [city, setCity] = useState(user.address.city)
    const [zipcode, setZipcode] = useState(user.address.zipcode)
    const [geoLat, setGeoLat] = useState(user.address.geolocation.lat)
    const [geoLong, setGeoLong] = useState(user.address.geolocation.long)
    
    useEffect(() => {
        if(updateStatus === 'succeeded'){
            setToggleEdit(false)
            setAlert({action : 'success', title : 'Update User Success'})
            setTimeout(() => {setAlert('')},2000)
            dispatch(setIdleUser())
        }
        else if (updateStatus === 'failed'){
            setAlert({action : 'error', title : 'Update User Failed'})
            setTimeout(() => {setAlert('')},2000)
            dispatch(setIdleUser())
        }
    }, [updateStatus])


    const handleUpdate = async (e) => {
        e.preventDefault()
        const data = {
            id: Number(user.id),
            email,
            username,
            password: user.password,
            firstname,
            lastname,
            city,
            street,
            number,
            zipcode,
            lat:geoLat,
            long:geoLong,
            phone:phone
        }
        await dispatch(updateUser(data))
    }

    if(!toggleEdit){
        return ( 
            <div className="Account flex flex-col gap-3 ">
                <div className="flex items-center">
                    <Link to='/setting' className="block sm:hidden"><ArrowCircleLeftOutlinedIcon sx={{ fontSize: 35 }} className="hover:text-[#BA60FE]"/></Link>
                    <p className="grow font-bold text-xl sm:text-2xl text-[#BA60FE] mb-2 text-center sm:text-start"><span className="font-normal text-[#CF91FF]">{user.name.firstname} {user.name.lastname}'s</span> ACCOUNT</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full bg-[#BA60FE]/15 rounded-xl p-3">
                    <div className="avatar placeholder flex justify-center md:justify-start">
                        <div className="bg-gray-400 text-neutral-content rounded-full w-16 md:w-24">
                            <span className="text-2xl">{`${user.name.firstname[0]}`}</span>
                        </div>
                    </div> 
                    <CardAcc edit={toggleEdit} titleCard={'First Name'} data={`${user.name.firstname}`}/>
                    <CardAcc edit={toggleEdit} titleCard={'Last Name'} data={`${user.name.lastname}`}/>
                </div>
                <div className="flex flex-col bg-[#BA60FE]/15 rounded-xl p-3 gap-3">
                    <CardAcc edit={toggleEdit} titleCard={'Username'} data={user.username} />
                    <CardAcc edit={toggleEdit} titleCard={'Email'} data={user.email} />
                    <CardAcc edit={toggleEdit} titleCard={'Phone'} data={user.phone} />
                    <CardAcc edit={toggleEdit} titleCard={'Address'} data={`${user.address.street} No.${user.address.number}, ${user.address.city}, ${user.address.zipcode} `} />
                    <CardAcc edit={toggleEdit} titleCard={'Geolocation'} data={`${user.address.geolocation.lat}, ${user.address.geolocation.long}`} />
                </div>
                <div className="flex gap-x-2">
                    <Link to='/setting' className="hidden sm:block"><ArrowCircleLeftOutlinedIcon sx={{ fontSize: 50 }} className="hover:text-[#BA60FE]"/></Link>
                    <button className="bg-[#BA60FE] text-white p-2 rounded hover:bg-[#BA60FE]/70" onClick={() => {setToggleEdit(true)}}>Edit Account</button>
                </div>
            </div>
        )
    }    

    return ( 
        <div className="Account flex flex-col gap-3 ">
            <div className="flex items-center">
                <p className="grow font-bold text-xl sm:text-2xl text-[#BA60FE] mb-2 text-center sm:text-start"><span className="font-normal text-[#CF91FF]">{user.name.firstname} {user.name.lastname}'s</span> EDIT ACCOUNT</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full bg-[#BA60FE]/15 rounded-xl p-3">
                <div className="avatar placeholder flex justify-center md:justify-start">
                    <div className="bg-gray-400 text-neutral-content rounded-full w-16 md:w-24">
                        <span className="text-2xl">{`${user.name.firstname[0]}`}</span>
                    </div>
                </div> 
                <CardAcc edit={toggleEdit} titleCard={'First Name'} data={`${firstname}`} setData={setFirstName}/>
                <CardAcc edit={toggleEdit} titleCard={'Last Name'} data={`${lastname}`} setData={setLastName}/>
            </div>
            <div className="flex flex-col bg-[#BA60FE]/15 rounded-xl p-3 gap-3">
                <CardAcc edit={toggleEdit} titleCard={'Username'} data={username} setData={setUsername}/>
                <CardAcc edit={toggleEdit} titleCard={'Email'} data={email} setData={setEmail}/>
                <CardAcc edit={toggleEdit} titleCard={'Phone'} data={phone} setData={setPhone}/>
                <CardAcc edit={toggleEdit} titleCard={'City'} data={`${city}`} setData={setCity}/>
                <CardAcc edit={toggleEdit} titleCard={'Street'} data={`${street}`} setData={setStreet}/>
                <CardAcc edit={toggleEdit} titleCard={'Number'} data={`${number}`} setData={setNumber}/>
                <CardAcc edit={toggleEdit} titleCard={'Zipcode'} data={`${zipcode}`} setData={setZipcode}/>
                <CardAcc edit={toggleEdit} titleCard={'Geolocation Lat'} data={`${geoLat}`} setData={setGeoLat}/>
                <CardAcc edit={toggleEdit} titleCard={'Geolocation Long'} data={`${geoLong}`} setData={setGeoLong}/>
            </div>
            <div className="flex flex-col sm:flex-row justify-end w-full gap-y-3 sm:gap-x-3">
                {updateStatus !== 'loading' && <button className="p-3 bg-green-800 rounded hover:bg-green-500" onClick={(e) => handleUpdate(e)}>Save</button>}
                {updateStatus === 'loading' && <button className="p-3 bg-green-800 rounded" disabled>Saving...</button>}
                <button className="p-3 bg-red-800 rounded hover:bg-red-500" onClick={() => {setToggleEdit(false)}}>Cancel</button>
            </div>
        </div>
    );
}
 
export default Account;