import React, { FC, useEffect, useState } from 'react';
import { db } from '../../../config/firebase-config';
import { collection, doc, getDocs } from 'firebase/firestore';
import ShopProduct from './ShopProduct';

interface ProductItem {
    title: string;
    price: number;
    isClub: boolean;
    image?: string;
    id: string;
}

const Shop: FC = () => {
    //State Management
    const [productList, setProductList] = useState<ProductItem[]>([])

    //Firebase Collection Refference
    const collectionRef = collection(db, "products");

    //Fetch Product Data
    const fetchProducts = async () => {
        try {
        //Get data
        const data = await getDocs(collectionRef);
        const productData: ProductItem[] = data.docs.map((doc) => ({...doc.data(), id: doc.id} as ProductItem))
        //Set list
        setProductList(productData);
    } catch(err) {
        console.error(err);
    }
}
    useEffect(() => {
        fetchProducts();
    }, [])
    
  return (
    <div className="bg-[#fff] py-[50px] w-full flex flex-col items-center justify-center">
        <h1 className="text-[2.5rem] pb-[50px]">Shop our Range</h1>
        <div className="w-full flex items-center justify-center flex-col">
            <div className="grid grid-cols-3 gap-9">
                {productList.map((product) => (
                  <div>
                    <ShopProduct product={product} />
                  </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Shop;