export default function NotFound() {
    return (
        <div className="flex flex-col justify-center items-center h-screen w-full bg-[#F5F5F7]">
            <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-lg">
                The page you are looking for does not exist. Please check the URL or return to the homepage.
            </p>
        </div>
    );
}