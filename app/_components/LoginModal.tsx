"use client";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { useState } from "react";
import { useRouter } from 'next/navigation'

type LoginModalProps = {
  closeModal: () => void;
};

type LoginInfo = {
  email: string;
  password: string;
  type: string;
};

export default function LoginModal({ closeModal }: LoginModalProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    password: "",
    type: "Login",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!loginInfo.email || !loginInfo.password) {
      setErrorMessage("Please fill in all fields.");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }

    if(!/\S+@\S+\.\S+/.test(loginInfo.email)) {
      setErrorMessage("Please enter a valid email address.");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }

    try {
      const response = await axios.post("/api/users", loginInfo);
      closeModal();
      router.push('/dashboard');
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials and try again.");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      console.error("Login failed:", error);
    }
  };
  return (
    <>
      <div className="absolute inset-0 bg-black w-full h-screen opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-blue-500 rounded-xl p-6 text-white">
          <div className="flex justify-between items-center border-b">
            <h2>Login</h2>
            <button onClick={() => closeModal()}>
              <IoMdClose />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-[3px]">
              <label htmlFor="loginEmail">Email:</label>
              <input
                className="text-black p-2 rounded-xl text-md"
                type="email"
                id="loginEmail"
                name="loginEmail"
                value={loginInfo.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setLoginInfo({ ...loginInfo, email: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-col mb-[3px]">
              <label htmlFor="loginPassword">Password:</label>
              <input
                className="text-black p-2 rounded-xl text-md"
                type="password"
                id="loginPassword"
                name="loginPassword"
                value={loginInfo.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setLoginInfo({ ...loginInfo, password: e.target.value });
                }}
              />
            </div>
            <div className="flex justify-center items-center">
              <button type="submit">Login</button>
            </div>
          </form>
          {errorMessage && (
            <div className="mt-2 text-red-500">{errorMessage}</div>
          )}
        </div>
      </div>
    </>
  );
}
