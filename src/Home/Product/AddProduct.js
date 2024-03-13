import { FaXmark } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProducts, setIdle, selectAllProducts } from "../../Redux/productSlice";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import {Context} from '../../Context'

const AddProduct = () => {
    const {setAlert} = useContext(Context);
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [category, setCate] = useState('')
    const [price, setPrice] = useState('')
    const [required, setRequired] = useState({})
    const dispatch = useDispatch()
    const addStatus = useSelector(state => state.products.statusAdd)
    const navigate = useNavigate()
    
    const addData = async (e) => {
        const data = {
            title,
            desc,
            category,
            price
        }
        e.preventDefault()
        if(title && price){
            dispatch(addProducts(data))
        }
        if (!title || !price) {
            setRequired({
                title: !title ? 'required' : '',
                price: !price ? 'required' : '',
            });
        }
    };

    useEffect(() => {
        if(addStatus === 'succeeded'){
            setAlert({action : 'success', title : 'Add Product Success'})
            setTimeout(() => {setAlert('')
            navigate('/products')
            },1000)
            
            dispatch(setIdle())
        }
        if(addStatus === 'failed'){
            setAlert({action : 'error', title : 'Add Product Failed'})
            setTimeout(() => {setAlert('')},2000)
            dispatch(setIdle())
        }
    }, [addStatus])

    return (
        <>
            <div className="AddProduct w-full rounded-2xl p-5 flex flex-col gap-3">
                <div className="bar flex justify-end items-center">
                    <h1 id="head" className="text-3xl text-[#BA60FE] font-bold text-center grow">Add Product</h1>
                    <button className="text-4xl text-red-700 hover:cursor-pointer self-end"><FaXmark id="close" onClick={() => {navigate(-1)}}></FaXmark></button>                   
                </div>

                <label htmlFor="Title" className="text-xl">Title : </label>
                <div>
                    <input type="text" name="Title" id="Title" placeholder="Title" className={`input focus:border-none w-full rounded p-3 focus:outline focus:outline-[#BA60FE] ${(required.title === 'required' && !title) ? 'input-bordered input-warning' : 'border border-[#BA60FE]'}`}  onChange={(e) => setTitle(e.target.value)}/>
                    {(required.title === 'required' && !title) && <p className="text-sm text-yellow-700">Mohon isi bidang ini</p>}
                </div>

                <label htmlFor="Description" className="text-xl">Description : </label>
                <textarea name="Description" id="Description" placeholder="Description" className="textarea w-full rounded p-3 border border-[#BA60FE] focus:outline focus:outline-[#BA60FE] focus:border-none"  onChange={(e) => setDesc(e.target.value)}></textarea>

                <label htmlFor="Category" className="text-xl">Category : </label>
                <input type="text" name="Category" id="Category" placeholder="Category" className="input focus:border-none w-full rounded p-3 border border-[#BA60FE] focus:outline focus:outline-[#BA60FE]"  onChange={(e) => setCate(e.target.value)}/>

                <label htmlFor="Price" className="text-xl">Price : </label>
                <div>
                    <input type="text" name="Price" id="Price" placeholder="Price" className={`input focus:border-none w-full rounded p-3 focus:outline focus:outline-[#BA60FE] ${(required.price === 'required' && !price) ? 'input-bordered input-warning' : 'border border-[#BA60FE]'}`} value={price} onChange={(e) => setPrice(e.target.value.replace(/[^\d.]/g, ''))}/>
                    {(required.price === 'required' && !price) && <p className="text-sm text-yellow-700">Mohon isi bidang ini</p>}
                </div>

                <label htmlFor="Image" className="text-xl">Image : </label>
                <input type="file" name="Image" id='Image' className="w-full" />
                {addStatus !== 'loading' && (<button onClick={addData} className="border border-[#BA60FE] rounded-xl hover:bg-[#BA60FE] w-1/2 p-3 text-xl hover:text-white self-center">SUBMIT</button>)}
                {addStatus === 'loading' && (<button onClick={addData} className="bg-[#BA60FE]/50 rounded-xl w-1/2 p-3 text-xl text-white self-center" disabled>Please Wait...</button>)}
            </div>
        </> 
     );
}
 
export default AddProduct;