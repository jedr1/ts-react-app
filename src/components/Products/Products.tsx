import React, { FC, useEffect, useState } from 'react';
import { db, storage } from '../../config/firebase-config';
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
        // Read Data
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
        })

        getProductList();
        setImageURL("");
    
    } catch(err) {
        console.error(err);
      }
    
    };
    
    return (
    <div>
        <div>
            <input type="text" placeholder="Product Title" onChange={(e) => {setNewTitle(e.target.value)}} />
            <input placeholder="Price" type="number" onChange={(e) => {setNewPrice(Number(e.target.value))}} />
            <input type="file" onChange={(e) => setImageUpload(e.target.files?.[0] || null)}/>
            <button onClick={handleUploadImage}>Upload File</button>
            <input type="checkbox" checked={isNewProductAClub} onChange={(e) => {setIsNewProductAClub(e.target.checked)}} />
            <label>Is a Club</label>
            <button onClick={handleProductSubmit}>Submit Product</button>
        </div>
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
  )
}

export default Products;