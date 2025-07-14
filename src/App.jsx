import "./App.css";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Jobs from "./Pages/Jobs";
import LoginPage from "./Pages/Login";
import NewJob from "./Pages/NewJob";
import Register from "./Pages/Register";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Routes/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
