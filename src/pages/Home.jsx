import React from "react";
import { useGlobalContext } from "../hooks/useGlobalContext.jsx";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config.js";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useGlobalContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">No Recipe</h1>

        {user ? (
          <div className="flex flex-col items-center space-y-3">
            <img
              src={user.photoURL || "https://via.placeholder.com/100"}
              alt="User Avatar"
              className="w-24 h-24 rounded-full object-cover border"
            />
            <h2 className="text-xl font-semibold">
              {user.displayName || "No Name"}
            </h2>
            <p className="text-gray-500">{user.email}</p>

            <button onClick={handleLogout} className="btn btn-error mt-4">
              Logout
            </button>
          </div>
        ) : (
          <p>Foydalanuvchi ma’lumoti topilmadi.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
