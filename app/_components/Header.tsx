"use client";
import { useState } from "react";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
export default function Header() {
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const closeModals = () => {
    setOpenRegisterModal(false);
    setOpenLoginModal(false);
  }
  return (
    <>
      <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <h1>Product Management Dashboard</h1>
        <div className="flex gap-4">
          <button onClick={() => setOpenRegisterModal(true)} className="bg-blue-500 p-2 rounded-xl">Register</button>
          <button onClick={() => setOpenLoginModal(true)} className="bg-blue-500 p-2 rounded-xl">Login</button>
        </div>
      </header>
      {openRegisterModal && <RegisterModal closeModal={closeModals} />}
      {openLoginModal && <LoginModal closeModal={closeModals} />}
    </>
  );
}
