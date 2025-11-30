import { IoMdClose } from "react-icons/io";
import { useState } from "react";

type AddProductModalProps = {
  closeModal: () => void;
  addProduct: (productData: any) => Promise<void>;
  categories: Array<any>;
};

export default function AddProductModal({
  closeModal,
  addProduct,
  categories,
}: AddProductModalProps) {
  const [productInfo, setProductInfo] = useState<any>({
    title: "",
    image: null,
    description: "",
    price: 0,
    cost: 0,
    quantity: 0,
    category: "",
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    let imagePath = "";

    // Upload image if provided
    if (productInfo.image) {
      const formData = new FormData();
      formData.append('file', productInfo.image);

      const uploadResponse = await fetch('/api/file_upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Image upload failed');
      }

      const uploadData = await uploadResponse.json();
      imagePath = uploadData.path;
    }

    // Add product with image path
    await addProduct({
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
            <h2>Add Product</h2>
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
            <div className="flex mb-[3px] items-center gap-2 justify-center">
              <input
                type="checkbox"
                className="text-black p-2 rounded-xl text-md accent-[#FF9500]"
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
              <button type="submit" className="bg-[#FF9500] rounded-xl p-2 my-2 hover:brightness-90">Add</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
