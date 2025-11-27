import { IoMdClose } from "react-icons/io";
export default function LoginModal() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="absolute inset-0 bg-black w-full h-screen opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-blue-500 rounded-xl p-6 text-white">
          <div className="flex justify-between items-center border-b">
            <h2>Login</h2>
            <button><IoMdClose /></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-[3px]">
              <label htmlFor="loginEmail">Email:</label>
              <input type="email" id="loginEmail" name="loginEmail" />
            </div>
            <div className="flex flex-col mb-[3px]">
              <label htmlFor="loginPassword">Password:</label>
              <input type="password" id="loginPassword" name="loginPassword" />
            </div>
            <div className="flex justify-center items-center">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
