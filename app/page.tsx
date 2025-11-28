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
      <div className="">
        <h1>Product Management Dashboard</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setOpenRegisterModal(true)}
            className="bg-blue-500 p-2 rounded-xl"
          >
            Register
          </button>
          <button
            onClick={() => setOpenLoginModal(true)}
            className="bg-blue-500 p-2 rounded-xl"
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
