"use client";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import axios from "axios";

type EditProductModalProps = {
  closeModal: () => void;
  editProduct: (productId: string, updatedData: any) => Promise<void>; 
  categories: Array<any>;
  product: any;
};

export default function EditProductModal({
  closeModal,
  editProduct,
  categories,
  product,
}: EditProductModalProps) {
  const [productInfo, setProductInfo] = useState<any>(product);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    let imagePath = productInfo.image;
    // Upload image if provided
    if(! productInfo.image === product.image){
        const formData = new FormData();
        formData.append('file', productInfo.image);

        const uploadResponse = await axios.post('/api/file_upload', formData);

        if (uploadResponse.status !== 200) {
          throw new Error('Image upload failed');
        }
        const uploadData = uploadResponse.data;
        imagePath = uploadData.path;
    }

    editProduct(product._id, {
      ...productInfo,
      image: imagePath,
    });
    
    closeModal();
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

  return (
    <>
      <div className="bg-black absolute inset-0 opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-blue-500 rounded-xl p-6 text-white">
          <div className="flex justify-between items-center border-b">
            <h2>Edit Product</h2>
            <button onClick={() => closeModal()}>
              <IoMdClose />
            </button>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div className="flex flex-col mb-[3px]">
              <label htmlFor="">Product Name</label>
              <input
                type="text"
                className="text-black p-2 rounded-xl text-md"
                value={productInfo.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setProductInfo({
                    ...productInfo,
                    title: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex flex-col mb-[3px]">
              <label htmlFor="">Image</label>
              <input
                type="file"
                className="text-black p-2 rounded-xl text-md"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files && e.target.files[0]) {
                    setProductInfo({
                        ...productInfo,
                        image: e.target.files[0],
                    });
                  }
                }}
              />
            </div>
            <div className="flex flex-col mb-[3px]">
              <label htmlFor="">Description</label>
              <textarea
                className="text-black p-2 rounded-xl text-md"
                value={productInfo.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setProductInfo({
                    ...productInfo,
                    description: e.target.value,
                  });
                }}
              ></textarea>
            </div>
            <div className="flex flex-col mb-[3px]">
              <label htmlFor="">Price</label>
              <input
                type="number"
                className="text-black p-2 rounded-xl text-md"
                value={productInfo.price}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setProductInfo({
                    ...productInfo,
                    price: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex flex-col mb-[3px]">
              <label htmlFor="">Cost</label>
              <input
                type="number"
                className="text-black p-2 rounded-xl text-md"
                value={productInfo.cost}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setProductInfo({
                    ...productInfo,
                    cost: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex flex-col mb-[3px]">
              <label htmlFor="">Quantity</label>
              <input
                type="number"
                className="text-black p-2 rounded-xl text-md"
                value={productInfo.quantity}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setProductInfo({
                    ...productInfo,
                    quantity: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex flex-col mb-[3px]">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id=""
                className="text-black p-2 rounded-xl text-md"
                value={productInfo.category}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setProductInfo({
                    ...productInfo,
                    category: e.target.value,
                  });
                }}
              >
                <option value="" disabled className="text-black rounded-xl">
                  Select Category
                </option>
                {categories.map((category) => (
                  <option
                    key={category._id}
                    value={category._id}
                    className="text-black rounded-xl"
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex mb-[3px] items-center gap-2">
              <input
                type="checkbox"
                className="text-black p-2 rounded-xl text-md"
                name="isActive"
                id="isActive"
                checked={productInfo.isActive}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setProductInfo({
                    ...productInfo,
                    isActive: e.target.checked,
                  });
                }}
              />
              <label htmlFor="isActive">Active</label>
            </div>
            <div className="flex justify-center items-center">
              <button type="submit" className="bg-[#FF9500] rounded-xl p-2 my-2 hover:brightness-90">Save</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
