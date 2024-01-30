import React, {FC, useState} from 'react';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

interface ProductItem {
    id: string,
    title: string,
    price: number,
    isClub: boolean,
    image?: string,
}

interface ProductProps {
    product: ProductItem;
    onDelete: (id: string) => void;
    onUpdateTitle: (id: string, newUpdatedTitle: string) => void;
    onUpdatePrice: (id: string, newUpdatedPrice: number) => void;
  }

const Product: FC<ProductProps> = ({ product, onDelete, onUpdateTitle, onUpdatePrice }) => {
    const [updatedTitle, setUpdatedTitle] = useState<string>('');
    const [updatedPrice, setUpdatedPrice] = useState<number>(0);

    const handleUpdateTitle = () => {
      onUpdateTitle(product.id, updatedTitle);
    };
    const handleUpdatePrice = () => {
        onUpdatePrice(product.id, updatedPrice);
    }
  return (
    <div>
      <img style={{width: "300px", height: "300px" }} src={product.image} alt="" /> 
        <h1 style={{color: product.isClub ? "green" : "red"}}>{product.title}</h1>
        <p>Price: {product.price}</p>
        <button onClick={() => onDelete(product.id)}>Delete Product</button>
        <input placeholder="New Title" onChange={(e) => setUpdatedTitle(e.target.value)} />
        <input type="number" placeholder="New Price" onChange={(e) => setUpdatedPrice(Number(e.target.value))} />
        <button onClick={handleUpdateTitle}>Update Title</button>
        <button onClick ={handleUpdatePrice}>Update Price</button>
        </div>
  )
}

export default Product