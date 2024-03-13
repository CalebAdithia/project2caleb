import { useDebugValue, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Context} from '../../Context'
import { useContext } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { setIdle, updateProducts, deleteProducts, fetchSingleProducts } from "../../Redux/productSlice";
import LinearProgress from '@mui/material/LinearProgress';

const EditProduct = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {id} = useParams()

    const [detailProduct, setDetailProduct] = useState('')
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [category, setCate] = useState('')
    const [price, setPrice] = useState('')

    const {setGlobalDetail, setAlert} = useContext(Context);

    const updateStatus = useSelector(state => state.products.statusUpdate)
    const deleteStatus = useSelector(state => state.products.statusDelete)
    const fetchStatus = useSelector(state => state.products.statusSingle)

    const handleEdit = async(e) => {
        e.preventDefault()
        const data = {
            id : detailProduct.id,
            title: title,
            price: price,
            description: desc,
            image: detailProduct.image,
            category: category
        }
        try{
            const response = await dispatch(updateProducts(data)) 
            console.log(response)
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        if(updateStatus === 'succeeded'){
            console.log('lol')
            setGlobalDetail(false)
            setAlert({action : 'success', title : 'Edit Product Success'})
            setTimeout(() => {setAlert('')},2000)
            navigate('/products')
        }
        else if(updateStatus === 'failed'){
            setAlert({action : 'error', title : 'Edit Product Failed'})
            setTimeout(() => {setAlert('')},2000)
        }
        dispatch(setIdle())
    }, [updateStatus])

    const handleDeleteProduct = async () => {
        await dispatch(deleteProducts(detailProduct.id))
    }

    useEffect(() => {
        if(deleteStatus === 'succeeded'){
            console.log('lol2')
            setGlobalDetail(false)
            setAlert({action : 'success', title : 'Delete Product Success'})
            setTimeout(() => {setAlert('')},2000)
            dispatch(setIdle())
            navigate('/products')
        }
        else if(deleteStatus === 'failed'){
            setAlert({action : 'error', title : 'Delete Product Failed'})
            setTimeout(() => {setAlert('')},2000)
            dispatch(setIdle())
        }
    }, [deleteStatus])

    const fetchSingleData = async () => {
        try {
            const response = await dispatch(fetchSingleProducts(id))
            setDetailProduct(response.payload.data)
            dispatch(setIdle())
        } catch (err) {
            console.log(err)
            setAlert({action : 'error', title : 'Fetch Product Failed'})
            setTimeout(() => {setAlert('')},2000)
            dispatch(setIdle())
        }
    }

    let content
    if(fetchStatus === 'loading'){
        content = <LinearProgress color="secondary" />
    }
    else if (detailProduct){
        content = 
        <>
            <h1 id="head" className="text-3xl text-[#BA60FE] font-bold w-full text-center">Edit Product</h1>
            <div className="container flex flex-col items-start gap-y-2">
                <label htmlFor="Title" className="text-xl">Title : </label>
                <input type="text" id="Title" className="border border-[#BA60FE] focus:outline-[#BA60FE] focus:border-none p-2 w-full rounded-md " value={detailProduct.title} onChange={(e) => setTitle(e.target.value)}/>
                <label htmlFor="Description" className="text-xl">Description : </label>
                <textarea name="Description" id="Description" placeholder="Description" className="textarea w-full rounded p-3 border border-[#BA60FE] focus:outline-[#BA60FE] focus:border-none" value={detailProduct.description} onChange={(e) => setDesc(e.target.value)}></textarea>
                <label htmlFor="Category" className="text-xl">Category : </label>
                <input type="text" id="Category" className="border border-[#BA60FE] focus:outline-[#BA60FE] focus:border-none p-2 w-full rounded-md" value={detailProduct.category} onChange={(e) => setCate(e.target.value)}/>
                <label htmlFor="Price" className="text-xl">Price : </label>
                <input type="text" id="Price" className="border border-[#BA60FE] focus:outline-[#BA60FE] focus:border-none p-2 w-full rounded-md" value={detailProduct.price} onChange={(e) => setPrice(e.target.value)}/>
            </div>
            <div className="flex flex-col size-full gap-3">
                {updateStatus === 'loading' && <button className="p-2 bg-green-700 rounded-md font-bold" onClick={handleEdit}>Saving...</button>}
                {updateStatus !== 'loading' && <button className="p-2 bg-green-700 rounded-md hover:bg-green-500 font-bold" onClick={handleEdit}>Save</button>}
                {deleteStatus === 'loading' ? 
                    <button className="bg-red-800 p-2 rounded-md font-bold" disabled>Deleting...</button> 
                    : 
                    <button className="bg-red-800 hover:bg-red-500 p-2 rounded-md font-bold" onClick={handleDeleteProduct}>Delete</button> 
                }
                <button className="p-2 bg-gray-800 rounded-md hover:bg-gray-500 font-bold" onClick={() => {navigate('/products')}}>Cancel</button>
            </div>
        </>
    }

    useEffect(() => {
        fetchSingleData()
    }, [id])

    return (
        <div className="modal-content size-full flex flex-col items-start gap-y-2 md:justify-between border-[#BA60FE]">
            {content}
        </div>
    );
}
 
export default EditProduct;