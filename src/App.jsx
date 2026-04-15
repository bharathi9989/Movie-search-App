import AppRoutes from "./routes/AppRoutes";
import { FavoritesProvider } from "./context/FavoritesContext";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <FavoritesProvider>
      <Navbar />
      <AppRoutes />
    </FavoritesProvider>
  );
}
