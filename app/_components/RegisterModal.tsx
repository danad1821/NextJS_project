"use client";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'

type RegisterModalProps = {
  closeModal: () => void;
};

type RegisterInfo = {
  email: string;
  password: string;
  confirmPassword: string;
  type: string;
};

export default function RegisterModal({ closeModal }: RegisterModalProps) {
  const router = useRouter();
  const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({
    email: "",
    password: "",
    confirmPassword: "",
    type: "Register",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (registerInfo.password !== registerInfo.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }

    if (registerInfo.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(registerInfo.email)) {
      setErrorMessage("Please enter a valid email address.");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }

    try {
      const response = await axios.post("/api/users", registerInfo);
      closeModal();
      router.push('/dashboard');
    } catch (error: any) {
      const message =
        error.response?.data?.error || "An unknown error occurred.";
      setErrorMessage(`Registration failed: ${message}`);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      console.error("Registration failed:", error);
    }
  };
  return (
    <>
      <div className="absolute inset-0 bg-black w-full h-screen opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-[#3478F6] rounded-xl p-6 text-white">
          <div className="flex justify-between items-center border-b py-2">
            <h2 className="text-xl">Register</h2>
            <button onClick={() => closeModal()} className="text-xl">
              <IoMdClose />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="my-2">
            <div className="flex flex-col mb-[3px]">
              <label htmlFor="registerEmail" className="text-lg">Email</label>
              <input
                className="text-black p-2 rounded-xl text-md"
                type="email"
                id="registerEmail"
                name="registerEmail"
                value={registerInfo.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setRegisterInfo({ ...registerInfo, email: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-col mb-[3px]">
              <label htmlFor="registerPassword" className="text-lg">Password:</label>
              <input
                className="text-black p-2 rounded-xl text-md"
                type="password"
                id="registerPassword"
                name="registerPassword"
                value={registerInfo.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setRegisterInfo({
                    ...registerInfo,
                    password: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex flex-col mb-[3px]">
              <label htmlFor="registerConfirmPassword" className="text-lg">Confirm Password:</label>
              <input
                className="text-black p-2 rounded-xl text-md"
                type="password"
                id="registerConfirmPassword"
                name="registerConfirmPassword"
                value={registerInfo.confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setRegisterInfo({
                    ...registerInfo,
                    confirmPassword: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex justify-center items-center">
              <button type="submit" className="bg-[#FF9500] rounded-xl p-2 my-2 hover:brightness-90">Register</button>
            </div>
          </form>
          {errorMessage && (
            <div className="mt-2 text-red-500 max-w-[200px] text-center bg-white rounded-xl border-red-500 p-1">{errorMessage}</div>
          )}
        </div>
      </div>
    </>
  );
}
