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
      <div className="border p-4 rounded-xl shadow-md">
        {isEditing ? (
          <>
            <input
              type="text"
              className="text-black p-2 rounded-xl text-md"
              value={editingName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEditingName(e.target.value);
              }}
            />
            <button
              onClick={() => {
                editCategory(category._id, { name: editingName });
                setIsEditing(false);
              }}
            >
              Save
            </button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold mb-2">{category.name}</h3>
            <div>
              <button
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(true);
                }}
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
