import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-between p-4 bg-black text-white">
      <Link to="/">🎬 Movies</Link>
      <Link to="/favorites">❤️ Favorites</Link>
    </div>
  );
}
