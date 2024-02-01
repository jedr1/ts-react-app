import React, { FC, useEffect, useState } from 'react';
import { db, storage, auth } from '../../config/firebase-config';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Product from './Product';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

interface ProductItem {
    id: string;
    title: string;
    price: number;
    isClub: boolean;
    image?: string;
}

const Products: FC = () => {
    const [productList, setProductList] = useState<ProductItem[]>([]);

    // New Product States
    const [newTitle, setNewTitle] = useState<string>("");
    const [newPrice, setNewPrice] = useState<number>(0);
    const [imageUpload, setImageUpload] = useState<File | null>(null);
    const [imageURL, setImageURL] = useState<string>("")
    const [isNewProductAClub, setIsNewProductAClub] = useState<boolean>(false);

    //Firebase Collection Ref
    const productsCollectionRef = collection(db, "products");

    //Fetch Products Function
    const getProductList = async () => {
        try {
        // Get Data
        const data = await getDocs(productsCollectionRef);
        const filteredData: ProductItem[] = data.docs.map((doc) => ({...doc.data(), id: doc.id} as ProductItem)) ;
        // Set List
        setProductList(filteredData);
        console.log(filteredData);
        } catch(err) {
            console.error(err);
        }
    };

    //Delete Product
    const deleteProduct = async (id: string) => {
        try {
            const productDoc = doc(db, "products", id)
            await deleteDoc(productDoc);
            getProductList();
        } catch(err) {
            console.error(err);
        }
    }

    //Update Product
    const updateTitle = async (id: string, newUpdatedTitle: string) => {
        try {
            const productDoc = doc(db, "products", id);
            await updateDoc(productDoc, {title: newUpdatedTitle});
            getProductList();
        } catch(err) {
            console.error(err);
        }
    };
    const updatePrice = async (id: string, newUpdatedPrice: number) => {
        try {
            const productDoc = doc(db, "products", id);
            await updateDoc(productDoc, {price: newUpdatedPrice});
            getProductList();
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getProductList();
    }, []);

    //Upload Image to Firebase
    const handleUploadImage = async () => {
        if (!imageUpload) return;
        const imageFolderRef = ref(storage, `images/${imageUpload.name}`);
        try {
        await uploadBytes(imageFolderRef, imageUpload)
        const downloadURL = await getDownloadURL(imageFolderRef);
            setImageURL(downloadURL);
        } catch(err) {
            console.error(err);
        }
    }

    //Handle Submit
    const handleProductSubmit = async () => {
        try {
        await addDoc(productsCollectionRef, {
            title: newTitle, 
            price: newPrice, 
            isClub: isNewProductAClub,
            image: imageURL,
            userId: auth?.currentUser?.uid,
        })

        getProductList();
        setImageURL("");
    
    } catch(err) {
        console.error(err);
      }
    
    };
    
    return (
    <div className="bg-[#ffffff] mt-[100px] w-full flex flex-col items-center justify-center py-[50px]">
        <div className="text-[1.5rem] mb-[25px]">Add a New Product</div>
        <div className="flex flex-col gap-[10px] w-[350px] mb-[50px]">
            <input type="text" placeholder="Product Title" onChange={(e) => {setNewTitle(e.target.value)}} />
            <input placeholder="Price" type="number" onChange={(e) => {setNewPrice(Number(e.target.value))}} />
            <input type="file" onChange={(e) => setImageUpload(e.target.files?.[0] || null)}/>
            
            <div className='flex gap-[5px]'>
            <input type="checkbox" checked={isNewProductAClub} onChange={(e) => {setIsNewProductAClub(e.target.checked)}} />
            <label>Is a Club?</label>
            </div>
            <div className="w-full grid grid-cols-2">
            <button className="border border-solid border-[#eee] py-4 transition duration-300 ease hover:border-black" onClick={handleUploadImage}>Upload File</button>
            <button className=" bg-[#081542] py-4 text-[#fff]  transition duration-300 ease hover:bg-[#102674]" onClick={handleProductSubmit}>Submit Product</button>
            </div>
        </div>
        <div className="w-full flex items-center justify-center">
            <div className="grid grid-cols-3 gap-4">
                {productList.map((product) => (
                <div>
                    <Product 
                    key={product.id} 
                    product={product} 
                    onDelete={deleteProduct} 
                    onUpdatePrice={updatePrice} 
                    onUpdateTitle={updateTitle} />
                </div>
            ))}
            </div>
        </div>
    </div>
  )
}

export default Products;