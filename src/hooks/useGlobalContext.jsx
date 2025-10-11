import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config.js";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);

  // 🔹 Recept qo‘shish (har bir recept user bilan bog‘lanadi)
  const addRecipe = (newRecipe) => {
    if (!user) return; // foydalanuvchi bo‘lmasa hech narsa qilinmaydi

    const recipeWithUser = {
      ...newRecipe,
      userId: user.uid,
      createdAt: new Date().toISOString(),
    };

    setRecipes((prev) => [...prev, recipeWithUser]);
  };

  // 🔹 Foydalanuvchini kuzatish (Firebase)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 🔹 Foydalanuvchi o‘zgarsa — unga tegishli receptlarni localStorage dan o‘qiymiz
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`recipes_${user.uid}`);
      if (saved) {
        setRecipes(JSON.parse(saved));
      } else {
        setRecipes([]); // yangi foydalanuvchi uchun bo‘sh array
      }
    }
  }, [user]);

  // 🔹 Foydalanuvchining receptlarini localStorage ga yozish
  useEffect(() => {
    if (user) {
      localStorage.setItem(`recipes_${user.uid}`, JSON.stringify(recipes));
    }
  }, [recipes, user]);

  return (
    <GlobalContext.Provider value={{ user, loading, recipes, addRecipe }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
