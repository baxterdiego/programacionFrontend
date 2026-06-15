import { useState } from "react";

// Componente encargado de registrar y mostrar productos
function ProductForm() {
  // Datos ingresados en el formulario
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [stock, setStock] = useState("");
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState("");

  // Lista donde se almacenan los productos registrados
  const [productos, setProductos] = useState([]);

  // Mensajes de error para las validaciones
  const [error, setError] = useState("");

  // Estados utilizados para filtrar productos
  const [categoriaPrincipal, setCategoriaPrincipal] =
    useState("");

  const [filtroCategoria, setFiltroCategoria] =
    useState("Todos");

  // Función para validar la imagen y mostrar una vista previa
  const manejarImagen = (e) => {
    const archivo = e.target.files[0];

    // Verifica que el usuario haya seleccionado una imagen
    if (!archivo) return;

    // La imagen no puede superar los 2 MB
    if (archivo.size > 2 * 1024 * 1024) {
      setError(
        "La imagen supera el tamaño permitido de 2MB."
      );
      setImagen(null);
      setPreview("");
      return;
    }

    setError("");
    setImagen(archivo);
    setPreview(URL.createObjectURL(archivo));
  };

  // Función para agregar un producto al catálogo
  const agregarProducto = (e) => {
    e.preventDefault();

    // Comprueba que todos los campos estén completos
    if (
      !nombre ||
      !descripcion ||
      !precio ||
      !categoria ||
      stock === "" ||
      !imagen
    ) {
      setError(
        "Todos los campos son obligatorios."
      );
      return;
    }

    // El precio debe ser mayor que cero
    if (Number(precio) <= 0) {
      setError(
        "El precio debe ser mayor a 0."
      );
      return;
    }

    // El stock no puede ser negativo
    if (Number(stock) < 0) {
      setError(
        "El stock no puede ser negativo."
      );
      return;
    }

    // Se crea el objeto con la información del producto
    const nuevoProducto = {
      id: Date.now(),
      nombre,
      descripcion,
      precio,
      categoria,
      stock,
      imagen: preview,
    };

    setProductos([
      ...productos,
      nuevoProducto,
    ]);

    // Limpia los campos después de registrar el producto
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setCategoria("");
    setStock("");
    setImagen(null);
    setPreview("");
    setError("");
  };

  // Permite eliminar un producto del listado
  const eliminarProducto = (id) => {
    // Solicita confirmación antes de eliminar
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

  // Filtra los productos según la categoría elegida por el usuario
  const productosFiltrados =
    filtroCategoria === "Todos"
      ? productos
      : productos.filter(
          (producto) =>
            producto.categoria ===
            filtroCategoria
        );

  // Estructura visual de la página
  return (
    <div className="container">

      {/* Catálogo de productos */}
      <h2 className="catalogo-titulo">
        Productos Disponibles
      </h2>

      {/* Categorías principales */}
      <div className="categorias-grid">
        <div
          className="categoria-card"
          onClick={() => {
            setCategoriaPrincipal(
              "Tecnología"
            );
            setFiltroCategoria("Todos");
          }}
        >
          <span>💻</span>
          <h3>Tecnología</h3>
        </div>

        <div
          className="categoria-card"
          onClick={() => {
            setCategoriaPrincipal(
              "Accesorios"
            );
            setFiltroCategoria("Todos");
          }}
        >
          <span>⌨️</span>
          <h3>Accesorios</h3>
        </div>
      </div>

      {categoriaPrincipal && (
        <div className="subcategorias">
          <button
            type="button"
            onClick={() =>
              setFiltroCategoria("Todos")
            }
          >
            Todos
          </button>

          {categoriaPrincipal ===
            "Tecnología" && (
            <>
              <button
                type="button"
                onClick={() =>
                  setFiltroCategoria(
                    "Smartphone"
                  )
                }
              >
                Smartphone
              </button>

              <button
                type="button"
                onClick={() =>
                  setFiltroCategoria(
                    "Notebook"
                  )
                }
              >
                Notebook
              </button>

              <button
                type="button"
                onClick={() =>
                  setFiltroCategoria(
                    "Monitor"
                  )
                }
              >
                Monitor
              </button>
            </>
          )}

          {categoriaPrincipal ===
            "Accesorios" && (
            <button
              type="button"
              onClick={() =>
                setFiltroCategoria(
                  "Periférico"
                )
              }
            >
              Periféricos
            </button>
          )}
        </div>
      )}

      {/* Tarjetas de productos registrados */}
      <div className="productos">
        {productosFiltrados.length ===
        0 ? (
          <p className="sin-productos">
            No hay productos registrados.
          </p>
        ) : (
          productosFiltrados.map(
            (producto) => (
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

                <div className="categoria-badge">
                  {producto.categoria}
                </div>

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
            )
          )
        )}
      </div>

      <h2 className="formulario-titulo">
        Agregar Producto
      </h2>

      <p className="contador-productos">
        Productos Registrados:{" "}
        {productos.length}
      </p>

      {/* Formulario para registrar productos */}
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
            setDescripcion(
              e.target.value
            )
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