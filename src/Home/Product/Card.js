import DetailModal from "./DetailModal";
import { useContext } from 'react';
import {Context} from '../../Context'


const Card = ({product}) => {
  const {setGlobalDetail, setDetailProduct, setAlert} = useContext(Context);

  const handleDetailOpen = (e) => {
    if(e.target.id === 'card') {
      setDetailProduct(product)
      setGlobalDetail(true)
    }
  }
  
  return (
    <>
      <button onClick={handleDetailOpen} className="hover:scale-95 transition-all duration-30">
        <div id="card" className="rounded-lg p-3 text-black bg-white flex flex-row items-start gap-x-2 size-full border-b shadow-md border-[#BA60FE] shadow-[#BA60FE] ">
            <div id="card" className="card-image w-1/2 h-full flex items-center justify-center">
                <img id="card" src={product.image} alt="Gambar Produk" className="max-h-full" />
            </div>
            <div id="card" className="card-content size-full flex flex-col items-start gap-y-3 justify-between border-l border-[#BA60FE] pl-2">
                <div id="card" className="container flex flex-col items-start gap-y-3">
                    <p id="card" className="line-clamp-2 font-bold text-start ">{product.title}</p>
                    <p id="card" className="border-2 border-[#BA60FE] rounded-md py-1 px-2 text-sm">{product.category}</p>
                    <p id="card" className="text-green-500 font-bold text-xl justify-end">${product.price}</p>
                </div>
            </div>
        </div>
      </button>
      <DetailModal productId={product.id}></DetailModal>
    </>
  );
};

export default Card;
