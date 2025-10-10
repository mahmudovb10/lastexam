import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    items: [],
  },
  reducers: {
    addRecipe: (state, action) => {
      state.items.push(action.payload);
    },
    deleteRecipe: (state, action) => {
      state.items = state.items.filter((_, i) => i !== action.payload);
    },
  },
});

export const { addRecipe, deleteRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
