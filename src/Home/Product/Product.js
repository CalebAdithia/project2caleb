import Card from "./Card";
import ProductBar from "./ProductBar";
import { useState, useEffect } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import {Context} from '../../Context'
import { useContext } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import {useDispatch, useSelector} from 'react-redux'
import { fetchCateProducts, fetchProducts, setIdle } from "../../Redux/productSlice";

const Product = () => {
  const {user, setGlobalDetail, setAlert} = useContext(Context);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searched, setSearch] = useState('');
  const [allCate, setAllCate] = useState("");
  const [addProducts, setAddProducts] = useState(false);
  const dispatch = useDispatch()
  const productStatus = useSelector(state => state.products.status)

  const fetchData = async () => {
    try{
      const response = await dispatch(fetchProducts())
      setProducts(response.payload)
      setAllProducts(response.payload)
      const response2 = await dispatch(fetchCateProducts())
      setAllCate(response2.payload.data)
    }
    catch(err){
      console.log(err)
    }
  };

  useEffect(() => {
    setGlobalDetail(false)
    setSearch('')
    setAlert('')
    fetchData();
  }, []);
  
  
  useEffect(() => {
    if(productStatus === 'succeeded'){
      setAlert({action : 'success', title : 'Fetch Product Success'})
      setTimeout(() => {setAlert('')},2000)
      dispatch(setIdle())
    }
    else if(productStatus === 'failed'){
      setAlert({action : 'error', title : 'Fetch Product Failed'})
      setTimeout(() => {setAlert('')},2000)
      dispatch(setIdle())
    }
  }, [productStatus]);

  return (
    <>
      <div className="Product w-full flex flex-col gap-5">
        <p className="font-bold text-xl sm:text-2xl text-[#BA60FE] text-center sm:text-start"><span className="font-normal text-[#CF91FF]">{user.name.firstname} {user.name.lastname}'s</span> PRODUCTS</p>
        {products?.length > 0 && 
          <>
            <ProductBar setProducts={setProducts} allProducts={allProducts} setAddProducts={setAddProducts} allCate={allCate} addProducts={addProducts} products={products} setSearch={setSearch}></ProductBar>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 overscroll-none">
              {products.filter(x => x.title.toLowerCase().includes(searched.toLowerCase())).map((x) => (
                <Card product={x} key={x.id}></Card>
              ))}
            </div>
          </>
        }
        {productStatus === 'loading' && <LinearProgress color="secondary" />}
      </div>
    </>
  );
};

export default Product;
