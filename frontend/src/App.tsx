import { useState } from "react";
import NavBar from "./components/MainPage/NavBar";
import Hero from "./components/MainPage/Hero";
import Footer from "./components/MainPage/Footer";
import "./App.css";
import Register from "./Register";

function App() {
  const [view, setView] = useState("HOME");

  if (view === "REGISTER") {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <Register onBack={() => setView("HOME")} />
      </div>
    );
  }

  return (
    <div className="app-root">
      <NavBar onOpenRegister={() => setView("REGISTER")} />
      <main>
        <Hero />
      </main>
      <Footer />
    </div>
  );
}

export default App;
