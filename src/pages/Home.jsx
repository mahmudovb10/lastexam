import React, { useState } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext.jsx";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config.js";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";

function Home() {
  const { user, recipes, deleteRecipe } = useGlobalContext();
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
        <h1 className="text-3xl font-bold mt-4 ml-[1.5rem]">Kitchen App</h1>
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

      <div className="relative">
        <button className="addBtn">
          <IoIosAddCircleOutline size={35} onClick={openRecipe} />
        </button>

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

      <div className="resipes mt-6">
        <h3 className="font-semibold text-lg ml-[1.5rem]">Recipe</h3>

        {recipes?.length === 0 ? (
          <p className="ml-[1.5rem]">No recipes yet...</p>
        ) : (
          recipes?.map((recipe, index) => (
            <div key={index} className="mt-3 ml-[1.5rem]">
              <div className="card bg-base-100 w-96 shadow-sm">
                <figure>
                  <img className="recipeImg" src={recipe.image} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    🍴{recipe.title}
                    <div className="badge badge-secondary">🕒{recipe.time}</div>
                  </h2>
                  <p className="recIng">🧂{recipe.ingredients}</p>
                  <p className="recMet">💭{recipe.method}</p>
                  <button
                    className="btn btn-error btn-sm mt-2"
                    onClick={() => deleteRecipe(recipe.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <hr className="mt-2 homehr" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
