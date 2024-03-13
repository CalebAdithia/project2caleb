import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import AnalyticsCard from './AnalyticsCard';
import axios from "axios";
import {Context} from '../../Context'
import { useContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {useDispatch, useSelector} from 'react-redux'
import { fetchCateProducts, fetchProducts } from '../../Redux/productSlice';

const Dashboard = () => {
    const dispatch = useDispatch()
    const {user, setAlert} = useContext(Context);
    const status = useSelector(state => state.products.status)
    const [countProducts, setCountProducts] = useState(0)
    const [lengthCate, setlengthCate] = useState(0)
    const [totalSold, setTotalSold] = useState(0)
    const [revenue, setRevenue] = useState([])
    const [chart, setChart] = useState('')

    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const handleSold = (value) => {
        const total = value.reduce((total, x) => total = total + x)
        setTotalSold(total)
    }

    let countCate = {}
    const productByCate = (value) => {
        value.forEach(label => {
            countCate[label] = (countCate[label] || 0) + 1;
        });
        const resultArray = [["Label", "Count"]];
            for (const label in countCate) {
            resultArray.push([label, countCate[label]]);
        }
        setChart(resultArray)
    }
    
    const handleRevenue = (price, sold) => {
        let x = []
        if (price.length === sold.length) {
            for (let i = 0; i < price.length; i++) {
                x.push(price[i] * sold[i]);
            }
            const total = x.reduce((sum, x) => sum = sum + x)
            setRevenue(total)
        } 
    }
    
    const fetchData = async () => {
        try {
            const response = await dispatch(fetchProducts())
            const hasil = response.payload
            const response2  = await dispatch(fetchCateProducts())
            setlengthCate(response2.payload.data.length)
            await setCountProducts(hasil.length)
            await productByCate(hasil.map(x => x.category))
            await handleSold(hasil.map(x => x.rating.count))
            await handleRevenue(hasil.map(x => x.price), hasil.map(x => x.rating.count))
            setAlert({action : 'success', title : 'Fetch Data Success'})
            setTimeout(() => {setAlert('')},2000)
        }
        catch(err){
            setAlert({action : 'error', title : 'Fetch Data Failed'})
            setTimeout(() => {setAlert('')},2000)
        }
    };

    useEffect(() => {
        setAlert('')
        fetchData()
    },[]);

    const options = {
        pieHole: 0.4,
        is3D: false,
        animation: {
            startup: true,
            duration: 1000,
            easing: 'out',
        }
    };
    
    return ( 
        <div className="Dashboard">
            <p className="font-bold text-xl sm:text-2xl text-[#BA60FE] mb-2 text-center sm:text-start"><span className="font-normal text-[#CF91FF]">{user.name.firstname} {user.name.lastname}'s</span> DASHBOARD</p>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                <div className='flex flex-col items-center justify-center border-b shadow-md p-1 border-[#BA60FE] shadow-[#BA60FE] rounded-xl col-span-4'>
                    {(chart && status !== 'loading') && 
                        <>
                            <h1 className='md:text-xl font-bold'>Product By Category</h1>
                            <Chart chartType="PieChart" width="100%" height="300px" data={chart} options={options}/>
                        </>
                    }
                    {status === 'loading' && 
                        <CircularProgress color="secondary"></CircularProgress>
                    }
                </div>
                <AnalyticsCard data={countProducts} title={'Total Product'} unit={'Products'} icons={<Inventory2OutlinedIcon fontSize="large"/>}></AnalyticsCard>
                <AnalyticsCard data={lengthCate} title={'Total Category'} unit={'Category'} icons={<CategoryOutlinedIcon fontSize="large"/>}></AnalyticsCard>
                <AnalyticsCard data={totalSold} title={'Total Product Sold'} unit={'Products'} icons={<ShoppingCartOutlinedIcon fontSize="large"/>}></AnalyticsCard>
                <AnalyticsCard data={USDollar.format(revenue)} title={'Total Revenue'} unit={''} icons={<AttachMoneyOutlinedIcon fontSize="large"/>}></AnalyticsCard>
            </div>
        </div>
     );
}
 
export default Dashboard;