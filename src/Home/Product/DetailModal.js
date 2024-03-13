import { FaPenToSquare, FaTrashCan, FaXmark } from "react-icons/fa6";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useNavigate } from "react-router-dom";
import {Context} from '../../Context'
import { useContext, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { deleteProducts, setIdle } from "../../Redux/productSlice";

const DetailModal = ({productId}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {globalDetail, setGlobalDetail, detailProduct, setAlert} = useContext(Context);
    const deleteStatus = useSelector(state => state.products.statusDelete)

    const handleClose = (e) =>{
        if(e.target.id === 'close') {
            setGlobalDetail(false)
        }
    }
    
    const handleButtonClose = () =>{
        setGlobalDetail(false)
    }

    const handleDeleteProduct = async () => {
        await dispatch(deleteProducts(detailProduct.id))
    }

    useEffect(() => {
        if(deleteStatus === 'succeeded'){
            setGlobalDetail(false)
            setAlert({action : 'success', title : 'Delete Product Success'})
            setTimeout(() => {setAlert('')},2000)
            navigate('/products')
            dispatch(setIdle()) 
        }
        else if(deleteStatus === 'failed'){
            setAlert({action : 'error', title : 'Delete Product Failed'})
            setTimeout(() => {setAlert('')},2000)
            dispatch(setIdle())
        }
    }, [deleteStatus])

    if(globalDetail && (productId === detailProduct.id)){
        return ( 
            <div id="close" className="DetailModal max-h-screen z-10 fixed inset-0 bg-black/50 backdrop-blur-sm flex flex-col justify-center items-center" onClick={handleClose}>
                <div className="bg-white rounded-lg max-h-screen p-3 flex flex-col text-black border size-full sm:w-4/5 md:h-fit md:w-4/5 lg:w-3/5 gap-y-3">
                    <div className="bar flex justify-end items-center border-b border-[#BA60FE]">
                        <h1 id="head" className="text-3xl text-center grow">Detail Product</h1>
                        <button className="p-2 text-4xl text-red-700 hover:cursor-pointer"><FaXmark id="close" onClick={handleButtonClose}></FaXmark></button>
                    </div>
                    <div className="flex flex-col md:flex-row items-start gap-2">
                        <div className="modal-image w-full h-1/6 md:w-1/3 md:h-full flex items-center justify-center">
                            <img src={detailProduct.image} alt="Gambar Produk" className="max-h-full" />
                        </div>
                        <div className="modal-content flex flex-col items-start gap-3 pt-2 md:justify-between border-t md:border-l md:border-t-0 border-[#BA60FE] md:pl-2 md:pt-0">
                            <div className="container flex flex-col items-start gap-y-3">
                                <p className="font-bold text-start">{detailProduct.title}</p>
                                <p className="overflow-y-auto max-h-32 sm:max-h-48">{detailProduct.description}</p>
                                <p className="">Category : {detailProduct.category}</p>
                                <p className="flex items-center">Rating : {detailProduct.rating.rate} <StarBorderIcon className="text-yellow-500"/></p>
                                <p className="">Price : <span className="text-green-500">${detailProduct.price}</span></p>
                            </div>
                            <div className="modal-footer flex gap-x-2">
                                <button onClick={() => {navigate(`/products/editproduct/${detailProduct.id}`)}}><FaPenToSquare className="bg-blue-800 text-white p-1 rounded-md text-4xl hover:bg-blue-500" ></FaPenToSquare></button>
                                {deleteStatus === 'loading' ? 
                                    <button className="bg-red-800 text-white p-1 rounded-md text-xl my-auto" disabled>Deleting...</button> 
                                    : 
                                    <FaTrashCan className="bg-red-700 text-white p-1 rounded-md text-4xl hover:bg-red-500 hover:cursor-pointer" onClick={handleDeleteProduct} ></FaTrashCan>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
    
}
 
export default DetailModal;