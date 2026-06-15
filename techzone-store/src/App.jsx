import "./App.css";
import ProductForm from "./components/ProductForm";

// Componente principal de la aplicación
function App() {
  return (
    <div>
      <header className="hero">
        <h1>TechZone Store</h1>

        <p>
          Los mejores productos tecnológicos en un solo lugar
        </p>

        <div className="hero-badges">
          <span>💻 Notebooks</span>
          <span>📱 Smartphones</span>
          <span>🖥️ Monitores</span>
          <span>⌨️ Periféricos</span>
        </div>
      </header>

      <main>
        <ProductForm />
      </main>
    </div>
  );
}

export default App;