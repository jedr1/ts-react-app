import { addDoc, collection } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react'
import { db } from '../../../config/firebase-config';

interface ShopProductItem {
    id: string,
    title: string,
    price: number,
    isClub: boolean,
    image?: string,
    quantity?: number,
}

interface ShopProductProps {
    product: ShopProductItem;
}

const ShopProduct: FC<ShopProductProps> = ({ product }) => {

  //Quantity State
  const [quantity, setQuantity] = useState<number>(1);

  // Get Ref to CartItems from Firestore
  const cartItemsRef = collection(db, "cartItems");

  //Add To Cart Function
  const addToCart = async ( product: ShopProductItem ) => {
    try {
      await addDoc(cartItemsRef, {
        title: product.title,
        price: product.price,
        image: product.image,
      })
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
        <img className="w-[400px] h-[250px] object-cover" src={product.image} />
        <div className="flex flex-col w-full items-start justify-start">
        <h1 className="font-[500] text-[1.3rem] mt-[15px] font-poppins">{product.title}</h1>
        <p className="text-[#e10000] text-[1.5rem] font-poppins">£{product.price}</p>
        <input type="number" placeholder="Quantity" onChange={(e) => setQuantity(Number(e.target.value))}></input>
        <button onClick={() => addToCart(product)} className="bg-[#102674] rounded-[10px] px-6 py-4 text-white font-poppins mt-[5px] transition duration-300 ease-in-out hover:bg-[#081542]">Add to Cart</button>
        </div>
        </div>
  )
}

export default ShopProduct;