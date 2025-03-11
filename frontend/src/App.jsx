import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrash, FaUtensils, FaPlus } from "react-icons/fa";
import "./App.css";

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState("");

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await api.get("/recipes");
      if (response.data.ok) {
        setRecipes(response.data.data || []);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error al obtener recetas:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar las recetas",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleAddIngredient = (e) => {
    e.preventDefault();
    if (!ingredientName.trim() || !ingredientAmount || ingredientAmount <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor ingresa un nombre y una cantidad válida",
      });
      return;
    }

    setIngredients([
      ...ingredients,
      { nombre: ingredientName.trim(), cantidad: Number(ingredientAmount) },
    ]);
    setIngredientName("");
    setIngredientAmount("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recipeName.trim() || ingredients.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor ingresa el nombre de la receta y al menos un ingrediente",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/recipes", {
        nombre: recipeName.trim(),
        ingredientes: ingredients,
      });

      if (response.data.ok) {
        await Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Receta guardada correctamente",
        });

        setRecipeName("");
        setIngredients([]);
        fetchRecipes();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error al guardar receta:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Error al guardar la receta",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecipe = async (id, nombre) => {
    try {
      const result = await Swal.fire({
        icon: "warning",
        title: "¿Estás seguro?",
        text: `¿Deseas eliminar la receta "${nombre}"?`,
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#e53e3e",
      });

      if (result.isConfirmed) {
        setLoading(true);
        const response = await api.delete(`/recipes/${id}`);
        
        if (response.data.ok) {
          await Swal.fire({
            icon: "success",
            title: "Eliminada",
            text: "La receta ha sido eliminada correctamente",
          });

          fetchRecipes();
        } else {
          throw new Error(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error al eliminar receta:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar la receta",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <header className="app-header text-center">
        <div className="container">
          <div className="d-flex align-items-center justify-content-center mb-2">
            <img src="/chef-hat.svg" alt="Chef Hat" className="header-icon me-2" width="32" height="32" />
            <h1>Recetario Digital</h1>
          </div>
          <p className="subtitle">Tu libro de cocina personal</p>
        </div>
      </header>

      <main className="flex-grow-1">
        <div className="container mb-5">
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="recipe-form-card">
                <div className="card-body">
                  <h2 className="card-title">
                    <FaPlus />
                    Nueva Receta
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="recipeName" className="form-label">
                        Nombre de la Receta
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="recipeName"
                        value={recipeName}
                        onChange={(e) => setRecipeName(e.target.value)}
                        placeholder="Ej: Pasta al Pesto"
                        disabled={loading}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Ingredientes</label>
                      <div className="ingredients-input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nombre del ingrediente"
                          value={ingredientName}
                          onChange={(e) => setIngredientName(e.target.value)}
                          disabled={loading}
                        />
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Cantidad"
                          value={ingredientAmount}
                          onChange={(e) => setIngredientAmount(e.target.value)}
                          min="1"
                          disabled={loading}
                        />
                        <button
                          type="button"
                          className="btn-success"
                          onClick={handleAddIngredient}
                          disabled={loading}
                          title="Agregar ingrediente"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>

                    {ingredients.length > 0 && (
                      <div className="ingredients-list">
                        {ingredients.map((ingredient, index) => (
                          <div key={index} className="ingredient-item">
                            <span className="ingredient-text">
                              {ingredient.nombre} - {ingredient.cantidad}
                            </span>
                            <button
                              type="button"
                              className="btn-danger"
                              onClick={() => handleDeleteIngredient(index)}
                              disabled={loading}
                              title="Eliminar ingrediente"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="btn-save-recipe"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm" />
                          <span>Guardando...</span>
                        </>
                      ) : (
                        <>
                          <FaUtensils />
                          <span>Guardar Receta</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="recipes-grid">
                {recipes.length === 0 ? (
                  <div className="empty-state">
                    <FaUtensils className="mb-3" />
                    <p>No hay recetas guardadas</p>
                    <small>Agrega una nueva receta para comenzar</small>
                  </div>
                ) : (
                  recipes.map((recipe) => (
                    <div key={recipe._id} className="recipe-card">
                      <h3 className="recipe-title">{recipe.nombre}</h3>
                      <button
                        className="delete-recipe"
                        onClick={() => handleDeleteRecipe(recipe._id, recipe.nombre)}
                        disabled={loading}
                        title="Eliminar receta"
                      >
                        <FaTrash />
                      </button>
                      <div className="recipe-ingredients">
                        <h4>
                          <FaUtensils className="me-2" />
                          Ingredientes
                        </h4>
                        <ul>
                          {recipe.ingredientes.map((ingredient, index) => (
                            <li key={index}>
                              <span className="ingredient-name">
                                {ingredient.nombre}
                              </span>
                              <span className="ingredient-amount">
                                {ingredient.cantidad}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="app-footer text-center">
        <div className="container">
          <p>
            @2025 - Daniel Loaiza
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
