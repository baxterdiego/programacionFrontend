import { useState } from "react";

function ProductForm() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [stock, setStock] = useState("");
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState("");
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");

  // Validación de imagen
  const manejarImagen = (e) => {
    const archivo = e.target.files[0];

    if (!archivo) return;

    if (archivo.size > 2 * 1024 * 1024) {
      setError("La imagen supera el tamaño permitido de 2MB.");
      setImagen(null);
      setPreview("");
      return;
    }

    setError("");
    setImagen(archivo);
    setPreview(URL.createObjectURL(archivo));
  };

  // Registrar producto
  const agregarProducto = (e) => {
    e.preventDefault();

    if (
      !nombre ||
      !descripcion ||
      !precio ||
      !categoria ||
      stock === "" ||
      !imagen
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (Number(precio) <= 0) {
      setError("El precio debe ser mayor a 0.");
      return;
    }

    if (Number(stock) < 0) {
      setError("El stock no puede ser negativo.");
      return;
    }

    const nuevoProducto = {
      id: Date.now(),
      nombre,
      descripcion,
      precio,
      categoria,
      stock,
      imagen: preview,
    };

    setProductos([...productos, nuevoProducto]);

    setNombre("");
    setDescripcion("");
    setPrecio("");
    setCategoria("");
    setStock("");
    setImagen(null);
    setPreview("");
    setError("");
  };

  // Eliminar producto
  const eliminarProducto = (id) => {
    const confirmar = window.confirm(
      "¿Desea eliminar este producto?"
    );

    if (confirmar) {
      setProductos(
        productos.filter(
          (producto) => producto.id !== id
        )
      );
    }
  };

  return (
    <div className="container">
      <h2>
        Productos Registrados: {productos.length}
      </h2>

      <h2 className="catalogo-titulo">
        Productos Disponibles
      </h2>

      <div className="productos">
        {productos.length === 0 ? (
          <p className="sin-productos">
            No hay productos registrados.
          </p>
        ) : (
          productos.map((producto) => (
            <div
              key={producto.id}
              className="card"
            >
              <img
                src={producto.imagen}
                alt={producto.nombre}
              />

              <h3>{producto.nombre}</h3>

              <p>{producto.descripcion}</p>

              <p>
                <strong>Precio:</strong> $
                {producto.precio}
              </p>

              <p>
                <strong>Categoría:</strong>{" "}
                {producto.categoria}
              </p>

              <p>
                <strong>Stock:</strong>{" "}
                {producto.stock} unidades
              </p>

              <button
                onClick={() =>
                  eliminarProducto(
                    producto.id
                  )
                }
              >
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>

      <h2 className="formulario-titulo">
        Agregar Producto
      </h2>

      <form
        onSubmit={agregarProducto}
        className="formulario"
      >
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) =>
            setNombre(e.target.value)
          }
        />

        <textarea
          placeholder="Descripción del producto"
          value={descripcion}
          onChange={(e) =>
            setDescripcion(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) =>
            setPrecio(e.target.value)
          }
        />

        <select
          value={categoria}
          onChange={(e) =>
            setCategoria(e.target.value)
          }
        >
          <option value="">
            Seleccione categoría
          </option>
          <option value="Notebook">
            Notebook
          </option>
          <option value="Monitor">
            Monitor
          </option>
          <option value="Periférico">
            Periférico
          </option>
          <option value="Smartphone">
            Smartphone
          </option>
        </select>

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
        />

        <input
          type="file"
          accept="image/*"
          onChange={manejarImagen}
        />

        {preview && (
          <img
            src={preview}
            alt="Vista previa"
            className="preview"
          />
        )}

        {error && (
          <p className="error">{error}</p>
        )}

        <button type="submit">
          Registrar Producto
        </button>
      </form>
    </div>
  );
}

export default ProductForm;