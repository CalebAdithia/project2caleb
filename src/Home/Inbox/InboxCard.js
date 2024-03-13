import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from "react-router-dom";

const InboxCard = ({title, msg, sender, date, id, read, updateDataById, handleDeleteMail}) => {
    return ( 
        <div className="border-b shadow-md border-[#BA60FE] shadow-[#BA60FE] rounded-xl max-w-full flex items-center pr-4 gap-x-3" onClick={() => {updateDataById(id)}} >
            <Link to={`/inbox/${id}`} className='flex items-center p-4 pr-0 gap-x-3 grow w-1/2 border-r'>
                <div className="icon">
                    {read && <DraftsOutlinedIcon fontSize='large'></DraftsOutlinedIcon>}
                    {!read && <MailOutlinedIcon fontSize='large' className='text-[#BA20FE]'></MailOutlinedIcon>}
                </div>
                <div className="flex flex-col w-1/2">
                    <p className={`font-bold ${read ? 'text-black' : 'text-[#BA20FE]'}`}>{title}</p>
                    <p className='text-gray-600 font-normal text-sm'>Sender : {sender}</p>
                    <p className='text-gray-500 font-normal text-sm truncate'>{msg}</p>
                    <p className='text-gray-400 text-sm'>{date}</p>
                </div>
            </Link>
            <DeleteIcon className='text-red-500 cursor-pointer' onClick={(e) => {handleDeleteMail(id, e)}}></DeleteIcon>
        </div>
    );
}
 
export default InboxCard;