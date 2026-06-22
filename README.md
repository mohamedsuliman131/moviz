<div align="center">

# 🎬 Moviz — Movie Search App

🌐 **Live Demo:** [moviz-theta.vercel.app](https://moviz-theta.vercel.app/)

A responsive movie discovery web app built with React and the TMDB API. Browse popular movies and TV shows, search for any title, watch trailers, view cast info, and get AI-powered movie recommendations via a built-in chatbot.

</div>

---

## ✨ Features

- 🔍 **Search** — Search any movie or TV show by title
- 🎥 **Movie Details** — Poster, rating, runtime, genres, overview, trailer, and full cast
- 📺 **Browse Pages** — Dedicated pages for Movies, TV Shows, and Trending/Popular
- ❤️ **Watchlist** — Add or remove movies from your personal watchlist (requires login)
- 🤖 **AI Chatbot** — Ask for movie recommendations by genre or mood, powered by Groq (Llama 3.3)
- 🎙️ **Voice Input** — Speak to the chatbot using your microphone
- 🔐 **Auth** — Register and login system with protected routes
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop

---

## 🛠️ Tech Stack

| Tech | Usage |
|---|---|
| React 19 | UI framework |
| Vite | Build tool |
| React Router v7 | Client-side routing |
| Bootstrap 5 | Responsive layout & navbar |
| Axios | API requests |
| TMDB API | Movies & TV shows data |
| Groq SDK (Llama 3.3) | AI chatbot |
| Swiper | Genre carousel |
| Formik + Yup | Form validation |
| React Hot Toast | Notifications |
| Font Awesome | Icons |

---

## 📸 Pages

| Page | Description |
|---|---|
| `/` | Home — hero section, popular movies, genre slider |
| `/movies` | Popular movies grid |
| `/tvshows` | Popular TV shows grid |
| `/popular` | Trending this week (movies + TV) |
| `/movie/:id` | Movie detail page with trailer and cast |
| `/search` | Search results |
| `/watchlist` | Saved watchlist (protected) |
| `/login` | Login page |
| `/register` | Register page |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/moviz.git
cd moviz
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root folder:

```env
VITE_GROQ_KEY=your_groq_api_key_here
```

> Get a free Groq API key at [console.groq.com](https://console.groq.com)  
> The TMDB API key is already included in the project for public use.

### 4. Run the app

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar/         # Responsive navbar with search
│   ├── HomePage/       # Hero + popular movies + genres
│   ├── Movies/         # Movies grid page
│   ├── TVShows/        # TV shows grid page
│   ├── Popular/        # Trending grid page
│   ├── Card/           # Movie detail page
│   ├── Search/         # Search results page
│   ├── Watchlist/      # Watchlist page
│   ├── Chatbot/        # AI movie chatbot
│   ├── Login/          # Login form
│   ├── Register/       # Register form
│   ├── Layout/         # Shared layout (navbar + footer)
│   └── ProtectedRoute/ # Route guard for auth
├── context/
│   ├── UserContext.jsx      # Auth state
│   └── WatchlistContext.jsx # Watchlist state
└── App.jsx             # Routes
```

---

## 🤖 AI Chatbot

The chatbot uses **Groq's Llama 3.3 70B** model and responds in the same language you write in (English or Arabic). You can:

- Ask for movie recommendations by genre (Action, Comedy, Horror, Romance)
- Tell it your mood (Sad, Happy, Bored, Stressed, Angry, Romantic) and get matching suggestions
- Use voice input via microphone (Chrome only)

---

## 📦 Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder, ready to deploy on Vercel, Netlify, or any static host.

---

## 🌐 Live Demo

👉 [https://moviz1122.netlify.app](https://moviz1122.netlify.app)

---

<div align="center">
Made with ❤️ by the Moviz Team
</div>
