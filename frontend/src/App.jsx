import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const initialState = {
  nombre: "",
  ingredientes: [],
  nombreIngrediente: "",
  cantidadIngrediente: 1,
};

function App() {
  const [form, setForm] = useState(initialState);
  const [recipes, setRecetas] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getRecetas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const getRecetas = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/recipes");
      setRecetas(data.data);
    } catch (error) {
      console.log("error en getRecetas", error.message);
    }
  };

  const agregarIngrediente = () => {
    let { nombreIngrediente, cantidadIngrediente } = form;

    if (nombreIngrediente && cantidadIngrediente) {
      setForm({
        ...form,
        ingredientes: [
          ...form.ingredientes,
          { nombre: nombreIngrediente, cantidad: cantidadIngrediente },
        ],
        nombreIngrediente: "",
        cantidadIngrediente: 1,
      });
    } else {
      Swal.fire({
        title: "ERROR",
        text: "Todos los campos son requeridos",
        icon: "error",
      });
    }
  };

  const deleteIngredient = (nameInrediente) => {
    const ingredients = [...form.ingredientes];
    const newIngredientes = ingredients.filter(
      (item) => item.nombre !== nameInrediente
    );
    setForm({ ...form, ingredientes: newIngredientes });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const metodo = isEdit ? "put" : "post";
      const url = isEdit
        ? `http://localhost:4000/recipes/${form._id}`
        : "http://localhost:4000/recipes";
      const { data } = await axios[metodo](url, form);
      await getPersonas();
      Swal.fire({
        position: "center",
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      if (!error.response.ok) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 2000,
        });
      }
      console.log("error en onSubmit", error.message);
    }
  };

  const deleteReceta = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/recipes/${id}`);
      Swal.fire({
        position: "center",
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 2000,
      });
      await getRecetas();
    } catch (error) {
      console.log("error en deleteReceta", error.message);
    }
  };

  const setUpdateData = (receta) => {
    setIsEdit(true);
    setForm(receta);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center  ">
        <div className="col-12 col-md-6 card  ">
          <div className="card-body">
            <h5 className="card-title">Crear receta</h5>
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre de la receta
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Receta"
                  autoComplete="false"
                  id="nombre"
                  required
                  name="nombre"
                  value={form.nombre}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder="Nombre del ingrediente"
                  autoComplete="false"
                  name="nombreIngrediente"
                  value={form.nombreIngrediente}
                  onChange={(e) => handleChange(e)}
                />

                <input
                  type="number"
                  min="1"
                  className="form-control "
                  placeholder="Cantidad"
                  autoComplete="false"
                  name="cantidadIngrediente"
                  value={form.cantidadIngrediente}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="mb-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => agregarIngrediente()}
                >
                  +
                </button>
              </div>

              <table className="table table-striped table-hover border ">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>ingrediente</th>
                    <th>cantidad</th>
                    <th>accion</th>
                  </tr>
                </thead>
                <tbody>
                  {form.ingredientes.map((item, i) => (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <th>{item.nombre}</th>
                      <th>{item.cantidad}</th>
                      <th>
                        <i
                          className="fa-solid fa-trash btn"
                          onClick={() => deleteIngredient(item.nombre)}
                        ></i>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button type="submit" className="btn btn-success ">
                Crear
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="table-responsive mt-5">
        <table className="table table-striped table-hover border ">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Receta</th>
              <th>Ingredientes</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((receta, index) => (
              <tr key={receta._id}>
                <td>{index + 1}</td>
                <td>{receta.nombre}</td>
                <td>
                  <div>
                    <button
                      className="btn btn-primary me-3"
                      onClick={() => setUpdateData(receta)}
                    >
                      Actualizar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteReceta(receta._id)}
                    >
                      Eliminar
                    </button>
                  </div>

                  <ul>
                    {receta.ingredientes.map((ingrediente, i) => (
                      <li key={i}>
                        {ingrediente.nombre} - {ingrediente.cantidad}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{receta.cantidadIngrediente}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
