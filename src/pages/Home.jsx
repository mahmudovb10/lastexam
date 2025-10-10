import React, { useState } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext.jsx";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config.js";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";

function Home() {
  const { user, recipes } = useGlobalContext();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const openRecipe = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold mt-4">Kitchen App</h1>
        <hr className="hrHome" />

        {user ? (
          <div className="relative">
            <FaUserCircle
              className="text-4xl cursor-pointer absolute right-10 top-[-2.5rem]"
              onClick={() => setShowProfile(!showProfile)}
            />

            {showProfile && (
              <div className="absolute right-0 mt-2 p-4 bg-base-100 shadow-xl rounded-lg border w-[20rem] homeIcon z-50">
                <div className="flex flex-col items-center space-y-2">
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="w-16 h-16 rounded-full object-cover border"
                  />
                  <h2 className="text-lg font-semibold">
                    {user.displayName || "No Name"}
                  </h2>
                  <p className="text-lg text-center">{user.email}</p>
                  <button
                    onClick={handleLogout}
                    className="btn btn-error btn-sm mt-2"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>Foydalanuvchi ma’lumoti topilmadi.</p>
        )}
      </div>

      {/* ICON va OCHILUVCHI BLOK */}
      <div className="relative">
        <button className="addBtn">
          <IoIosAddCircleOutline size={35} onClick={openRecipe} />
        </button>

        {/* ✅ Blok joyi o‘zgarishsiz, lekin layoutni siljitmaydi */}
        {open && (
          <div className="addOpen absolute bg-base-100 border rounded-lg shadow-md p-3 right-0 mt-2 z-50">
            <Link to={"/"}>
              <p className="homeOpen cursor-pointer mb-1">Home</p>
            </Link>
            <Link to={"/recipe"}>
              <button className="creatorBtn cursor-pointer mb-1">
                Create Recipe
              </button>
            </Link>
            <p className="themeOpen cursor-pointer">Change theme</p>
          </div>
        )}
      </div>

      {/* RECIPE LAR */}
      <div className="resipes mt-6">
        <h3 className="font-semibold text-lg">Recipe</h3>

        {recipes?.length === 0 ? (
          <p>No recipes yet...</p>
        ) : (
          recipes?.map((recipe, index) => (
            <div key={index} className="mt-3">
              <p>Title: {recipe.title}</p>
              <p>Cooking Time: {recipe.time}</p>
              <p>Ingredients: {recipe.ingredients}</p>
              <p>Method: {recipe.method}</p>

              {recipe.image && (
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  width="200"
                  height="150"
                  className="mt-2"
                />
              )}

              <hr className="mt-2 homehr" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
