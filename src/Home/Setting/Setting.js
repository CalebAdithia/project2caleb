import CardSetting from "./CardSetting";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import {Context} from '../../Context'
import { useContext, useEffect } from 'react';

const Setting = () => {
    const {user, setAlert} = useContext(Context)

    useEffect(() => {
        setAlert('')
    }, [])

    return ( 
        <div className="Setting flex flex-col gap-3">
            <p className="font-bold text-xl sm:text-2xl text-[#BA60FE] mb-2 text-center sm:text-start"><span className="font-normal text-[#CF91FF]">{user.name.firstname} {user.name.lastname}'s</span> Setting</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <CardSetting title={'Account'} icon={<AccountCircleIcon fontSize="large"/>} link={'/setting/account'} ></CardSetting>
                <CardSetting title={'Help'} icon={<QuizOutlinedIcon fontSize="large"/>} link={'/setting/help'}></CardSetting>
            </div>
        </div>
     );
}
 
export default Setting;