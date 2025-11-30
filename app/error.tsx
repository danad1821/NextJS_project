"use client";
export default function Error() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-[#F5F5F7]">
      <h1 className="text-3xl font-bold mb-4">Something went wrong!</h1>
      <p className="text-lg">
        Please try refreshing the page or come back later.
      </p>
    </div>
  );
}
