import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm px-4 py-3 border-b">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl font-semibold text-gray-800">Krishi - Agricultural Companion</h1>
        </div>
      </header>
      
      <main className="flex-1">
        <Outlet />
      </main>
      
      <footer className="bg-white border-t px-4 py-3">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p>&copy; 2024 Krishi. Your agricultural companion.</p>
        </div>
      </footer>
    </div>
  );
};