import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { FavoritesProvider } from "./context/FavoritesContext";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <Navbar />
        <AppRoutes />
      </FavoritesProvider>
    </BrowserRouter>
  );
}
