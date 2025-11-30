"use client";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
type AddCategoryModalProps = {
  closeModal: () => void;
  addCategory: (categoryName: string) => Promise<void>;
};
export default function AddCategoryModal({
  closeModal,
  addCategory,
}: AddCategoryModalProps) {
  const [categoryName, setCategoryName] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
        await addCategory(categoryName);
        closeModal();
    }catch(error){
        console.error("Error adding category:", error);
    }
  };
  return (
    <>
      <div className="bg-black absolute inset-0 opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-blue-500 rounded-xl p-6 text-white">
          <div className="flex justify-between items-center border-b">
            <h2 className="text-xl">Add Category</h2>
            <button onClick={() => closeModal()} className="text-xl">
              <IoMdClose />
            </button>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div className="flex flex-col mb-[3px]">
              <label htmlFor="">Category Name</label>
              <input
                type="text"
                className="text-black p-2 rounded-xl text-md"
                value={categoryName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCategoryName(e.target.value)
                }
              />
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
