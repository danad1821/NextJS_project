import { IoMdClose } from "react-icons/io";

type AddProductModalProps = {
  closeModal: () => void;
};

export default function AddProductModal({closeModal}: AddProductModalProps) {
  return (
    <>
      <div className="bg-black absolute inset-0 opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-blue-500 rounded-xl p-6 text-white">
          <div className="flex justify-between items-center border-b">
            <h2>Add Product</h2>
            <button onClick={()=> closeModal()}>
              <IoMdClose />
            </button>
          </div>
          <form action="">
            <div className="flex flex-col mb-[3px]">
              <label htmlFor="">Product Name</label>
              <input type="text" className="text-black p-2 rounded-xl text-md" />
            </div>
            <div className="flex flex-col mb-[3px]">
              <label htmlFor="">Description</label>
              <textarea className="text-black p-2 rounded-xl text-md"></textarea>
            </div>
            <div className="flex flex-col mb-[3px]">
              <label htmlFor="">Price</label>
              <input type="number" className="text-black p-2 rounded-xl text-md" />
            </div>
            <div className="flex flex-col mb-[3px]">
              <label htmlFor="">Cost</label>
              <input type="number" className="text-black p-2 rounded-xl text-md" />
            </div>
            <div className="flex flex-col mb-[3px]">
              <label htmlFor="">Quantity</label>
              <input type="number" className="text-black p-2 rounded-xl text-md" />
            </div>
            <div className="flex flex-col mb-[3px]">
              <label htmlFor="">Category</label>
              <select name="" id="">
                <option value="" disabled className="text-black">Select Category</option>
              </select>
            </div>
            <div className="flex mb-[3px] items-center gap-2">
              <input type="checkbox" className="text-black p-2 rounded-xl text-md" />
              <label htmlFor="">Active</label>
            </div>
            <div className="flex justify-center items-center"><button type="submit">Add</button></div>
          </form>
        </div>
      </div>
    </>
  );
}
