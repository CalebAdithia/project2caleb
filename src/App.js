import "./App.css";
import Login from "./Login/Login";
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Home/Navbar";
import Help from "./Home/Setting/Help/Help";
import Product from "./Home/Product/Product";
import Sidebar from "./Home/SideBar";
import Dashboard from "./Home/Dashboard/Dashboard";
import Inbox from "./Home/Inbox/Inbox";
import Account from "./Home/Setting/Account/Account";
import Setting from "./Home/Setting/Setting";
import DetailInbox from "./Home/Inbox/DetailInbox";
import { Context } from "./Context";
import NotFound from "./NotFound";
import AddProduct from "./Home/Product/AddProduct";
import EditProduct from "./Home/Product/EditProduct";
import Alert from '@mui/material/Alert';
import {useSelector} from 'react-redux'

function App() {
  
  const initialToken = localStorage.getItem("token") || "";
  const initialUser = JSON.parse(localStorage.getItem("user")) || [];
  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(initialUser);

  const [openSide, setSide] = useState(false)
  const [globalDetail, setGlobalDetail] = useState(false);
  const [detailProduct, setDetailProduct] = useState('')
  const [alert, setAlert] = useState(false);

  const error = useSelector(state => state.products.error)
  const errorUser = useSelector(state => state.user.errorUser) 
  const [dataInbox, setDataInbox] = useState([
    {
      id : 1,
      title : 'Diskusi Produk 1',
      msg : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi iure enim porro culpa dolorem voluptatum ab repellat consectetur alias magnam.",
      sender : 'Mr. John',
      date : '19/01/2024',
      read : false
    },
    {
      id : 2,
      title : 'Diskusi Produk 2',
      msg : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi iure enim porro culpa dolorem voluptatum ab repellat consectetur alias magnam.",
      sender : 'Mrs. John',
      date : '19/01/2024',
      read : false
    },
    {
      id : 3,
      title : 'Diskusi Produk 3',
      msg : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi iure enim porro culpa dolorem voluptatum ab repellat consectetur alias magnam.",
      sender : 'Mr. Jay',
      date : '19/01/2024',
      read : false
    },
    {
      id : 4,
      title : 'Diskusi Produk 4',
      msg : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi iure enim porro culpa dolorem voluptatum ab repellat consectetur alias magnam.",
      sender : 'Mr. Ken',
      date : '19/01/2024',
      read : false
    }
  ])

  useEffect(() => {
    setSide(false)
    setGlobalDetail(false)
  }, [])

  useEffect(() => {
    if(openSide){
      setAlert('')
    }
  }, [openSide]);

  return (
    <BrowserRouter>
      {(token && user) ? (
        <>
          <div className={`flex flex-row w-full min-h-screen ${openSide ? 'fixed' : 'flex'} ${globalDetail ? 'fixed' : 'flex'} `}>
            <Sidebar setSide={setSide} openSide={openSide} setToken={setToken} setUser={setUser}></Sidebar>
            <div className='flex flex-col w-full max-h-screen'>
              <Navbar user={user} setToken={setToken} setUser={setUser} setSide={setSide}></Navbar>
              <div className="Content size-full p-4 sm:p-5 overflow-auto">
                <Context.Provider value={{ dataInbox, setDataInbox, user, globalDetail, setGlobalDetail, detailProduct, setDetailProduct, alert, setAlert }}>
                  <Routes>
                    <Route path="/products">
                      <Route index element={<Product></Product>}/>
                      <Route path="addproduct" element={<AddProduct></AddProduct>} />
                      <Route path="editproduct/:id" element={<EditProduct></EditProduct>} />
                    </Route>
                    <Route path="/dashboard" element={<Dashboard ></Dashboard>} />
                    <Route path="/inbox" element={<Inbox ></Inbox>} />
                    <Route path="/inbox/:id" element={<DetailInbox></DetailInbox>} />
                    <Route path="/setting" element={<Setting ></Setting>} />
                    <Route path="/setting/help" element={<Help></Help>} />
                    <Route path="/setting/account" element={<Account ></Account>} />
                    <Route path="*" element={<NotFound></NotFound>} />
                  </Routes>
                </Context.Provider>
                </div>
            </div>
          </div>
          {alert.action === 'success' && <Alert severity="success" variant="filled" className="absolute inset-x-0 top-8 mx-auto sm:mx-0 sm:inset-x-auto sm:top-20 sm:right-8 size-fit bg-green-500" onClose={() => {setAlert('')}}>{alert.title}</Alert>}
          {alert.action === 'error' && 
            <Alert severity="error" variant="filled" className="absolute inset-x-0 top-8 mx-auto sm:mx-0 sm:inset-x-auto sm:top-20 sm:right-8 size-fit" onClose={() => {setAlert('')}}>
              <p className="text-sm">{alert.title}</p>
              <p className="text-xs">{error || errorUser}</p>
            </Alert>
          }
        </>
      ) : (
        <Routes>
          <Route exact path="/" element={<Login setToken={setToken} setUser={setUser} setSide={setSide} setGlobalDetail={setGlobalDetail}/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
