import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config.js";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);

  const addRecipe = (newRecipe) => {
    if (!user) return;

    const recipeWithUser = {
      ...newRecipe,
      id: uuidv4(),
      userId: user.uid,
      createdAt: new Date().toISOString(),
    };

    setRecipes((prev) => [...prev, recipeWithUser]);
  };

  const deleteRecipe = (id) => {
    if (!user) return;
    const updated = recipes.filter((r) => r.id !== id);
    setRecipes(updated);
    localStorage.setItem(`recipes_${user.uid}`, JSON.stringify(updated));

    toast.success("Delete Recipe");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`recipes_${user.uid}`);
      if (saved) {
        setRecipes(JSON.parse(saved));
      } else {
        setRecipes([]);
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`recipes_${user.uid}`, JSON.stringify(recipes));
    }
  }, [recipes, user]);

  return (
    <GlobalContext.Provider
      value={{ user, loading, recipes, addRecipe, deleteRecipe }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
