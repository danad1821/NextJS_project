"use client";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Call the server-side API route we just created
      const response = await fetch('/api/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/'); 
      } else {
        // Handle server-side errors, but still redirect for safety
        console.error('Logout failed on the server.');
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Network error during logout:', error);
      router.push('/dashboard');
    }
  };
  
  return (
    <>
      <header className="py-4 bg-[#3478F6] text-white ">
        <div className="flex items-center justify-between custom-container">
          <h1 className="text-3xl">Product Management Dashboard</h1>
          <button className="text-white bg-red-500 p-2 rounded-xl" onClick={handleLogout}>Logout</button>
        </div>
      </header>
      
    </>
  );
}
