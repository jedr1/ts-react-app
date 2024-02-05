import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import { db } from '../../config/firebase-config';
import { useCart } from './CartContext';

interface CartItem {
    title: string;
    price: number;
    id: string;
    image?: string;
}

const CartPage: FC = () => {

    //cartItems State
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    //Collection Reference from Firebase
    const cartItemsRef = collection(db, "cartItems");

    //Fetch cartItems
    const fetchCartItems = async () => {
        try {
        const data = await getDocs(cartItemsRef);
        const cartItemData: CartItem[] = data.docs.map((doc) => ({...doc.data(), id: doc.id} as CartItem));
        setCartItems(cartItemData);
        } catch(err) {
            console.error(err);
        }
    }
    useEffect(() => {
        fetchCartItems();
    })

    //Delete Cart Item 
    const deleteCartItem = async (id: string) => {
        try {
            const cartItemDoc = doc(db, "cartItems", id)
            await deleteDoc(cartItemDoc);
            fetchCartItems();
        } catch(err) {
            console.error(err);
        }
    }

  return (
    <div className="bg-white relative flex flex-col items-center justify-center mt-[120px]">
        <div className="text-[1.5rem]">
            Your Shopping Cart 
            </div>
            <div>
            {cartItems.map((item) => (
                <div className="w-full flex flex-col items-center justify-center">
                <img className="w-[400px] h-[350px] object-cover" src={item.image} />
                <div className="flex flex-col w-full items-start justify-start">
                <h1 className="font-[500] text-[2rem] font-poppins">{item.title}</h1>
                <p className="text-[#e10000] text-[1.5rem] font-poppins">£{item.price}</p>
                <button  onClick={() => deleteCartItem(item.id)} className="bg-[#e10000] text-[#ffffff] px-2 py-1 transition duration-300 ease hover:bg-[#b51d1d]">Delete Product</button>
                </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default CartPage