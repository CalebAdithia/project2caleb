import { useEffect, useState } from "react";
import {useParams, Link} from "react-router-dom";
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { useContext } from 'react';
import {Context} from '../../Context'

const DetailInbox = () => {
    const {dataInbox} = useContext(Context);

    const [filter, setFilter] = useState(false)
    const { id } = useParams()

    const filterData = async () => {
        console.log(dataInbox)
        const result = dataInbox.filter(x => x.id === parseInt(id))
        await setFilter(result) 
    }

    useEffect(() => {
        filterData()
    }, [])

    return ( 
        <> 
            {filter && 
                <div className="w-full border-b shadow-md border-[#BA60FE] shadow-[#BA60FE] flex flex-col p-5 gap-3 rounded-xl">
                    <p className='font-bold text-xl'>{filter[0].title}</p>
                    <p className='font-normal'>Sender : {filter[0].sender}</p>
                    <p className='font-normal'>Date : {filter[0].date}</p>
                    <p className='font-normal'>{filter[0].msg}</p>
                    <Link to='/inbox'><ArrowCircleLeftOutlinedIcon fontSize='large' className="hover:text-[#BA60FE]"/></Link>
                </div>
            }
        </>
    );
}
 
export default DetailInbox;