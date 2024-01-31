import React, { FC } from 'react'
interface ShopProductItem {
    id: string,
    title: string,
    price: number,
    isClub: boolean,
    image?: string,
}

interface ShopProductProps {
    product: ShopProductItem;
}

const ShopProduct: FC<ShopProductProps> = ({ product }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
        <img className="w-[400px] h-[350px] object-cover" src={product.image} />
        <div className="flex flex-col w-full items-start justify-start">
        <h1 className="font-[500] text-[2rem] font-poppins">{product.title}</h1>
        <p className="text-[#e10000] text-[1.5rem] font-poppins">£{product.price}</p>
        <button className="bg-[#081542] px-6 py-4 text-white font-poppins mt-[5px] transition duration-300 ease-in-out hover:bg-[#060f31]">Add to Cart</button>
        </div>
        </div>
  )
}

export default ShopProduct;