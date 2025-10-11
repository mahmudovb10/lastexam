import { useState } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useNavigate } from "react-router-dom";

function Recipe() {
  const { addRecipe } = useGlobalContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    time: "",
    ingredients: "",
    image: "",
    method: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addRecipe(formData);

    navigate("/");
  };

  return (
    <div className="recipeContainer">
      <h1 className="recipeTitle">Add New Recipe</h1>
      <form onSubmit={handleSubmit} className="recipeForm">
        <label>
          <span>Title:</span>
          <input
            type="text"
            name="title"
            className="input"
            placeholder="Enter your meal name"
            onChange={handleChange}
          />
        </label>

        <label>
          <span>Cooking Time:</span>
          <input
            type="text"
            name="time"
            className="input"
            placeholder="Enter preparation time of your meal"
            onChange={handleChange}
          />
        </label>

        <label>
          <span>Ingredients:</span>
          <input
            type="text"
            name="ingredients"
            className="input"
            placeholder="Enter ingredients of meal"
            onChange={handleChange}
          />
        </label>

        <label>
          <span>Image URL:</span>
          <input
            type="url"
            name="image"
            className="input"
            placeholder="Enter image URL"
            onChange={handleChange}
          />
        </label>

        <label>
          <span>Method:</span>
          <textarea
            name="method"
            className="textarea recipeTextarea"
            placeholder="Enter method of meal"
            onChange={handleChange}
          ></textarea>
        </label>

        <button type="submit" className="resBtn">
          Apply
        </button>
        <button className="resBtn prevBtn" type="button">
          Preview
        </button>
      </form>
    </div>
  );
}

export default Recipe;
