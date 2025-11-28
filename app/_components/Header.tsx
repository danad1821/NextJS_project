"use client";

export default function Header() {
  
  return (
    <>
      <header className="py-4 bg-gray-800 text-white ">
        <div className="flex items-center justify-between custom-container">
          <h1>Product Management Dashboard</h1>
          <button className="text-white bg-red-500 p-2 rounded-xl">Logout</button>
        </div>
      </header>
      
    </>
  );
}
