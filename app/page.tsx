"use client";
import { useState } from "react";
import RegisterModal from "@/app/_components/RegisterModal";
import LoginModal from "@/app/_components/LoginModal";
export default function Home() {
  const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const closeModals = () => {
    setOpenRegisterModal(false);
    setOpenLoginModal(false);
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen w-full bg-[#F5F5F7]">
        <h1 className="text-3xl my-10">Product Management Dashboard</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setOpenRegisterModal(true)}
            className="bg-[#3478F6] p-2 rounded-xl text-lg text-white hover:brightness-90"
          >
            Register
          </button>
          <button
            onClick={() => setOpenLoginModal(true)}
            className="bg-[#3478F6] p-2 rounded-xl text-lg text-white hover:brightness-90"
          >
            Login
          </button>
        </div>
      </div>
      {openRegisterModal && <RegisterModal closeModal={closeModals} />}
      {openLoginModal && <LoginModal closeModal={closeModals} />}
    </>
  );
}
