import { IoMdClose } from "react-icons/io";
export default function RegisterModal() {
    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
    return (
       <>
      <div className="absolute inset-0 bg-black w-full h-screen opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-blue-500 rounded-xl p-6 text-white">
          <div className="flex justify-between items-center border-b">
            <h2>Register</h2>
            <button><IoMdClose /></button>
          </div>
          <form onSubmit={handleSubmit} className="my-2">
            <div className="flex flex-col mb-[3px]">
              <label htmlFor="registerEmail">Email</label>
              <input type="email" id="registerEmail" name="registerEmail" />
            </div>
            <div className="flex flex-col mb-[3px]">
              <label htmlFor="registerPassword">Password:</label>
              <input type="password" id="registerPassword" name="registerPassword" />
            </div>
            <div className="flex flex-col mb-[3px]">
              <label htmlFor="registerConfirmPassword">Confirm Password:</label>
              <input type="password" id="registerConfirmPassword" name="registerConfirmPassword" />
            </div>
            <div className="flex justify-center items-center">
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    </>
    );
}