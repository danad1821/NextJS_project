"use client";
import { useState } from "react";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
export default function Header() {
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  return (
    <>
      <header className="flex items-center ">
        <h1>Product Management Dashboard</h1>
        <div className="flex gap-4">
          <button onClick={() => setOpenRegisterModal(true)}>Register</button>
          <button onClick={() => setOpenLoginModal(true)}>Login</button>
        </div>
      </header>
      {openRegisterModal && <RegisterModal />}
      {openLoginModal && <LoginModal />}
    </>
  );
}
