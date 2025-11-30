"use client";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
type CategoryCardProps = {
  category: any;
  editCategory: (ategoryId: string, updatedData: any) => void;
  deleteCategory: (categoryId: string) => Promise<void>;
};

export default function CategoryCard({
  category,
  editCategory,
  deleteCategory,
}: CategoryCardProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingName, setEditingName] = useState<string>(category.name);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  return (
    <>
      <div className="border p-2 rounded-xl shadow-sm flex items-center justify-between mr-2 mb-2">
        {isEditing ? (
          <>
            <input
              type="text"
              className="text-black p-2 rounded-xl text-md border border-gray-300"
              value={editingName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEditingName(e.target.value);
              }}
            />
            <div className="flex items-center">
              <button
                onClick={() => {
                  editCategory(category._id, { name: editingName });
                  setIsEditing(false);
                }}
                className="p-2 rounded-xl bg-[#FF9500] text-white mx-2 hover:brightness-90"
              >
                Save
              </button>
              <button onClick={() => setIsEditing(false)} className="p-2 rounded-xl bg-red-500 text-white mx-2 hover:brightness-90">Cancel</button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-md font-bold">{category.name}</h3>
            <div className="flex items-center">
              <button
                onClick={() => {
                  setIsEditing(true);
                }}
                className="p-2 rounded-xl bg-[#FF9500] text-white mx-2 hover:brightness-90"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(true);
                }}
                className="p-2 rounded-xl bg-red-500 text-white mx-2 hover:brightness-90"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
      {showDeleteModal && (
        <DeleteModal
          deleteFunction={deleteCategory}
          itemId={category._id}
          closeModal={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
}
