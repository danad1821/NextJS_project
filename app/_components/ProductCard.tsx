"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import DeleteModal from "./DeleteModal";

type ProductCardProps = {
  product: any;
  deleteProduct: (productId: string) => Promise<void>;
};

export default function ProductCard({ product, deleteProduct }: ProductCardProps) {
  const [categoryName, setCategoryName] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const response = await axios.get(`/api/categories/${product.category}`);
        setCategoryName(response.data.name);
      } catch (error) {
        console.error("Error fetching category name:", error);
      }
    };
    fetchCategoryName();
  }, [product.category]);

  return (
    <>
    <div className="border border-black rounded-xl p-3 flex flex-col gap-2 min-w-50 m-2">
      <div className="flex justify-center max-w-50 max-h-50">
          <Image src={product.image} alt={product.title} width={200} height={150} className="" />
      </div>
      <h4 className="text-lg font-bold">{product.title}</h4>
      <div >
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Cost: ${product.cost}</p>
        <p>Quantity: {product.quantity}</p>
        <p>Category: {categoryName}</p>
        <p>Status: {product.isActive ? "Active" : "Inactive"}</p>
      </div>
      <div className="flex items-center justify-end gap-2">
        <button className="bg-green-500 text-white p-2 rounded-xl">Edit</button>
        <button className="bg-red-500 text-white p-2 rounded-xl" onClick={()=>{setShowDeleteModal(true)}}>Delete</button>
      </div>
    </div>
    {showDeleteModal && (
      <DeleteModal deleteFunction={deleteProduct} closeModal={()=>{setShowDeleteModal(false)}} itemId={product._id}/>)}
    </>
  );
}
