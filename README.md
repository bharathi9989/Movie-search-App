🎬 Movie Search App

A full-featured movie search application built using React.js and the OMDb API. This app allows users to search for movies, explore detailed information, and manage a personalized list of favorite movies.

⸻

🚀 Features
	•	🔍 Search movies by title or keyword
	•	🎯 Filter movies by type (Movie / Series / Episode)
	•	📄 View detailed movie information
	•	❤️ Add and remove favorites (stored in localStorage)
	•	⚡ Debounced search (reduces unnecessary API calls)
	•	📦 Caching system (avoids repeated API calls)
	•	🔄 Infinite scrolling for seamless browsing
	•	❌ Error handling and empty state UI
	•	🖼️ Image fallback for broken/missing posters

⸻

🛠️ Tech Stack
	•	Frontend: React.js
	•	Routing: React Router
	•	Styling: Tailwind CSS
	•	API Calls: Axios
	•	State Management: Context API
	•	Build Tool: Vite

⸻

📁 Folder Structure

src/
├── api/            # API calls (OMDB)
├── components/     # Reusable UI components
├── context/        # Global state (Favorites)
├── hooks/          # Custom hooks (Debounce)
├── pages/          # Application pages
├── routes/         # Routing setup
├── utils/          # Helper functions (Cache)

Performance Optimizations
	•	Debouncing: Prevents API calls on every keystroke
	•	Caching: Stores previous search results
	•	Infinite Scroll: Loads data progressively
	•	Optimized Rendering: Avoids unnecessary re-renders

⸻

📦 Installation & Setup

git clone https://github.com/your-username/movie-search-app.git
cd movie-search-app
npm install
npm run dev

🧪 Build for Production

npm run build

🌐 Live Demo

👉 https://your-app.netlify.app

⸻

📁 GitHub Repository

👉 https://github.com/your-username/movie-search-app

⸻

🧠 Key Learnings
	•	API integration and error handling
	•	Performance optimization in React
	•	State management using Context API
	•	Building scalable frontend architecture
	•	Handling edge cases in UI

⸻

🙌 Acknowledgements
	•	OMDb API for movie data

⸻

📌 Conclusion

This project demonstrates a production-level React application with performance optimizations, clean architecture, and real-world features suitable for frontend engineering roles.
