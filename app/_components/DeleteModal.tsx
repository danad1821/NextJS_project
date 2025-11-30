type DeleteModalProps = {
  deleteFunction: (itemId: string) => Promise<void>;
  closeModal: () => void;
  itemId: string;
};
export default function DeleteModal({
  deleteFunction,
  closeModal,
  itemId,
}: DeleteModalProps) {
  return (
    <>
      <div className="absolute inset-0 bg-black w-full h-screen opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-blue-500 rounded-xl p-6 text-white">
          <h2>Are you sure you want to delete?</h2>
          <div className="flex justify-end gap-4 mt-4">
            <button
              className="bg-red-500 rounded-xl p-2 text-white hover:brightness-90"
              onClick={() => {
                deleteFunction(itemId);
                closeModal();
              }}
            >
              Yes
            </button>
            <button
              className="bg-green-500 rounded-xl p-2 text-white hover:brightness-90"
              onClick={() => {
                closeModal();
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
