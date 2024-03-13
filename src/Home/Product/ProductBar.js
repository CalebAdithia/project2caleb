import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import OutlinedInput from '@mui/material/OutlinedInput';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({allCate, allProducts, setProducts, setAddProducts, addProducts, products, setSearch}) => {
    const [sort, setSort] = useState('title-asc')
    const [filterCate, setFilterCate] = useState('')
    const [filterActive, setFilterActive] = useState(false)
    const [lowRange, setLowRange] = useState()
    const [highRange, setHighRange] = useState()
    const [age, setAge] = useState('');
    const navigate = useNavigate()
    const [prevSort, setPrevSort] = useState('');

    function searchProduct(value){
        setSearch(value) 
    }

    const handleSort = (select) => {
        setPrevSort(sort)
        setSort(select)
    }
    const cancelFilter = () => {
        setSort(prevSort)
        if(!filterActive){
            setFilterCate('')
            setLowRange('')
            setHighRange('')
        }
    }

    const cancelPrice = () => {
        setLowRange('')
        setHighRange('')
    }

    function formatPriceInput(input, action) {
        let value = input.value.replace(/[^\d.]/g, '');
        let [integerPart, decimalPart] = value.split('.');
        if (decimalPart !== undefined) {
            decimalPart = decimalPart.slice(0, 2);
        }
        value = decimalPart === undefined ? integerPart : `${integerPart}.${decimalPart}`;
        if(action === 'low'){
            setLowRange(value)
        }
        else if(action === 'high'){
            setHighRange(value)
        }
    }

    const handleAllFilter = () => {
        if(filterCate || lowRange || highRange){
            setFilterActive(true)
        }
        else{
            setFilterActive(false)
        }

        const beforeFilter = [...allProducts]

        let filter
        if(filterCate !== ""){
            filter = beforeFilter.filter(x => x.category === filterCate)
        }else{
            filter = [...allProducts]
        }
        if(lowRange && lowRange > 0){
            const low = parseFloat(lowRange);
            filter = filter.filter(x => x.price >= low)
        }
        if(highRange && highRange > 0){
            const high = parseFloat(highRange);
            filter = filter.filter(x => x.price <= high)
        }

        if (sort === 'title-desc'){
            const sorted = filter.sort((a, b) => b.title.localeCompare(a.title));
            setProducts(sorted)
        }
        else if (sort === 'title-asc'){
            const sorted = filter.sort((a, b) => a.title.localeCompare(b.title));
            setProducts(sorted)
        }
        else if (sort === 'price-desc'){
            const sorted = filter.sort((a, b) => b.price - a.price);
            setProducts(sorted)
        }
        else if (sort === 'price-asc'){
            const sorted = filter.sort((a, b) => a.price - b.price);
            setProducts(sorted)
        }
    }
    
    return ( 
        <>
            {!addProducts && 
                <div className="ProductBar flex flex-col gap-3 sm:flex-row">
                    <div className="searchBar border border-[#BA60FE] py-2 rounded-2xl bg-white flex flex-row items-center gap-x-2 grow lg:max-w-[50%]">
                        <div className="px-2">
                            <SearchIcon fontSize='medium'></SearchIcon>
                        </div>
                        <input type="text" name="search" id="search" className="grow rounded-r-2xl focus:outline-none mr-2" placeholder="Search" onChange={(e) => searchProduct(e.target.value)}/>
                    </div>
                    <div className="flex flex-row gap-3">
                        <button className=" border border-[#BA60FE] px-4 rounded-lg flex flex-row bg-white items-center gap-2 hover:text-white hover:bg-[#BA60FE] hover:scale-95 transition-all duration-300 sm:text-sm" onClick={() => {navigate('/products/addproduct')}}><AddIcon className="text-xl"></AddIcon></button>

                        {/* Modal Filter */}
                        <button className={`btn border-[#BA60FE] hover:text-white hover:bg-[#BA60FE] focus:outline-none active:outline-none sm:text-sm ${filterActive ? 'bg-[#BA60FE] text-white': ''}`} onClick={()=>document.getElementById('my_modal_2').showModal()}><FilterListIcon/></button>
                        <dialog id="my_modal_2" className="modal modal-bottom sm:modal-middle ">
                            <div className="modal-box">
                                <div className="category-filter">
                                    <p className="text-base font-bold border-b border-gray-300 pb-1 my-2 flex justify-between items-center">By Category 
                                        {filterCate && 
                                            <button onClick={() => setFilterCate('')} className=" hover:cursor-pointer">
                                                <CloseIcon className='text-red-500 m-0 p-0'/>
                                            </button>
                                        }
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {allCate && allCate.map(x => 
                                            <button value={x} key={x} className={`text-base p-2 border border-[#BA60FE] rounded-lg hover:text-white hover:bg-[#BA60FE] ${x === filterCate ? 'bg-[#BA60FE] rounded' : ''} `} onClick={(e) => setFilterCate(e.target.value)}>{x}</button>
                                        )}
                                    </div>
                                </div>

                                <div className='price filter'>
                                    <p className="text-base font-bold border-b border-gray-300 pb-1 my-2 flex justify-between items-center">Price Range
                                            {((lowRange || highRange) && filterActive) && 
                                                <button onClick={() => cancelPrice()} className=" hover:cursor-pointer">
                                                    <CloseIcon className='text-red-500 m-0 p-0'/>
                                                </button>
                                            }
                                        </p>
                                    <div className="flex sm:items-center sm:gap-2 flex-col sm:flex-row">
                                        <input name='low-price' type="text" placeholder="0" className="border border-[#BA60FE] p-2 rounded-lg focus:outline-none grow" value={lowRange} onChange={(e) => formatPriceInput(e.target, 'low')}/>
                                        <span className='text-3xl text-bold mb-1'>-</span>
                                        <input name='high-price'type="text" placeholder="0" className="border border-[#BA60FE] p-2 rounded-lg focus:outline-none grow" value={highRange} onChange={(e) => formatPriceInput(e.target, 'high')}/>
                                    </div>
                                </div>
                                
                                <div className="Sort">
                                    <p className="text-base font-bold border-b border-gray-300 pb-1 my-2 flex justify-between items-center">Sort</p>
                                    <div className="flex flex-wrap gap-2 ">
                                        <button className={`text-base p-2 border border-[#BA60FE] rounded-lg hover:text-white hover:bg-[#BA60FE] ${'title-asc' === sort ? 'bg-[#BA60FE]' : ''} `} onClick={() => {handleSort('title-asc')}}>Title Ascending</button>
                                        <button className={`text-base p-2 border border-[#BA60FE] rounded-lg hover:text-white hover:bg-[#BA60FE] ${'title-desc' === sort ? 'bg-[#BA60FE]' : ''}`} onClick={() => {handleSort('title-desc')}}>Title Descending</button>
                                        <button className={`text-base p-2 border border-[#BA60FE] rounded-lg hover:text-white hover:bg-[#BA60FE] ${'price-asc' === sort ? 'bg-[#BA60FE]' : ''} `} onClick={() => {handleSort('price-asc')}}>Price Ascending</button>
                                        <button className={`text-base p-2 border border-[#BA60FE] rounded-lg hover:text-white hover:bg-[#BA60FE] ${'price-desc' === sort ? 'bg-[#BA60FE]' : ''}`} onClick={() => {handleSort('price-desc')}}>Price Descending</button>

                                        {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                            <InputLabel id="demo-dialog-native">Age</InputLabel>
                                            <Select
                                                native
                                                value={age}
                                                onChange={handleChange}
                                            >
                                                <option aria-label="None" value="" />
                                                <option value={'title-asc'}>By Title Ascending</option>
                                                <option value={'title-desc'}>By Title Descending</option>
                                                <option value={'price-asc'}>By Price Ascending</option>
                                                <option value={'price-desc'}>By Price Descending</option>
                                            </Select>
                                        </FormControl> */}
                                        
                                        {/* <select className="select border-[#BA60FE] w-full focus:outline-none focus:border-[#BA60FE]" onChange={(e) => {setSort(e.target.value)}}>
                                            <option selected value={'title-asc'}>By Title Ascending</option>
                                            <option value={'title-desc'}>By Title Descending</option>
                                            <option value={'price-asc'}>By Price Ascending</option>
                                            <option value={'price-desc'}>By Price Descending</option>
                                        </select> */}
                                    </div>
                                </div>
                                <form method="dialog">
                                    <button type='submit' className="bg-[#BA60FE] w-full my-2 p-2 rounded-lg" onClick={handleAllFilter}>Apply</button>
                                </form>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button onClick={cancelFilter} >close</button>
                            </form>
                        </dialog>
                    </div>
                </div>
            }
        </>
     );
}
 
export default SearchBar;