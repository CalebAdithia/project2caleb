import InboxCard from "./InboxCard";
import { useContext, useEffect } from 'react';
import {Context} from '../../Context'

const Inbox = () => {
  const {user, dataInbox, setDataInbox, setAlert} = useContext(Context);
  const updateDataById = (idToUpdate) => {
    const updatedData = dataInbox.map(item => {
        if (item.id === parseInt(idToUpdate)) {
            return { ...item, read: true };
        }
        return item;
    });
    setDataInbox(updatedData)
  }  

  const handleDeleteMail = (id, e) => {
    e.stopPropagation()
    const updatedData = dataInbox.filter(item => item.id !== id);
    setDataInbox(updatedData)
  }

  useEffect(() => {
    setAlert('')
  }, [])

  return ( 
    <>
      {dataInbox && <div className="Inbox flex flex-col">
        <p className="font-bold text-xl sm:text-2xl text-[#BA60FE] mb-2 text-center sm:text-start">
          <span className="font-normal text-[#CF91FF]">{user.name.firstname} {user.name.lastname}'s</span> INBOX
        </p>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          {dataInbox.map(x => {
              return <InboxCard key={x.id} id={x.id} title={x.title} msg={x.msg} sender={x.sender} read={x.read} date={x.date} updateDataById={updateDataById} handleDeleteMail={handleDeleteMail}/>
          })}
        </div>
      </div>}

      {!dataInbox && <div className="w-full flex flex-col gap-5">
            <p className="font-bold text-xl sm:text-2xl text-[#BA60FE] mb-2 text-center sm:text-start">
              <span className="font-normal text-[#CF91FF]">{user.name.firstname} {user.name.lastname}'s</span> INBOX
            </p>
            <p className="flex justify-center items-center text-3xl text-[#BA60FE]">Please Wait, Loading Your Inbox...</p>
        </div>}
    </>
  );
};

export default Inbox;
