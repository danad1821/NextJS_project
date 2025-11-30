"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import DeleteModal from "./DeleteModal";
import EditProductModal from "./EditProductModal";

type ProductCardProps = {
  product: any;
  deleteProduct: (productId: string) => Promise<void>;
  editProduct: (productId: string, updatedData: any) => Promise<void>;
  categories: Array<any>;
};

export default function ProductCard({
  product,
  deleteProduct,
  editProduct,
  categories,
}: ProductCardProps) {
  const [categoryName, setCategoryName] = useState<string>(
    categories.find((cat) => cat._id === product.category)?.name || ""
  );
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  useEffect(() => {
    const category = categories.find((cat) => cat._id === product.category);
    if (category) {
      setCategoryName(category.name);
    }
  }, [categories, product.category]);

  return (
    <>
      <div className="border border-black rounded-xl p-3 flex flex-col gap-2 w-64 h-96 mr-8 mb-8 shadow-md">
        <div className="flex justify-center w-full h-40 overflow-hidden rounded-lg">
          <Image
            src={product.image}
            alt={product.title}
            width={150}
            height={150}
            className="object-cover w-full h-full"
          />
        </div>
        <h4 className="text-lg font-bold ">{product.title}</h4>
        <div className="text-sm">
          <p className="">{product.description.split(" ").slice(0,10).join(" ")}...</p>
          <p className="">Price: ${product.price}</p>
          <p className="">Cost: ${product.cost}</p>
          <p className="">Quantity: {product.quantity}</p>
          <p className="">Category: {categoryName}</p>
          <p className="">Status: {product.isActive ? "Active" : "Inactive"}</p>
        </div>
        <div className="flex items-center justify-end gap-2">
          <button
            className="p-2 rounded-xl bg-[#FF9500] text-white mx-2 hover:brightness-90"
            onClick={() => {
              setShowEditModal(true);
            }}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded-xl hover:brightness-90"
            onClick={() => {
              setShowDeleteModal(true);
            }}
          >
            Delete
          </button>
        </div>
      </div>

      {showDeleteModal && (
        <DeleteModal
          deleteFunction={deleteProduct}
          closeModal={() => {
            setShowDeleteModal(false);
          }}
          itemId={product._id}
        />
      )}
      {showEditModal && (
        <EditProductModal
          editProduct={editProduct}
          closeModal={() => {
            setShowEditModal(false);
          }}
          product={product}
          categories={categories}
        />
      )}
    </>
  );
}
