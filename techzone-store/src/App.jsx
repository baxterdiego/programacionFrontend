import "./App.css";
import ProductForm from "./components/ProductForm";

function App() {
  return (
    <div>
      <header className="hero">
        <h1>TechZone Store</h1>
        <p>
          Los mejores productos tecnológicos en un solo lugar
        </p>
      </header>

      <main>
        <ProductForm />
      </main>
    </div>
  );
}

export default App;
