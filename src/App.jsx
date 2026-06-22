import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Notfound from "./components/Notfound/Notfound";
import HomePage from "./components/HomePage/HomePage";
import Card from "./components/Card/Card";
import Search from "./components/Search/Search";
import Movies from "./components/Movies/Movies";
import TVShows from "./components/TVShows/TVShows";
import Popular from "./components/Popular/Popular";
import Watchlist from "./components/Watchlist/Watchlist";
import GenreMovies from "./components/GenreMovies/GenreMovies";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { WatchlistProvider } from "./context/WatchlistContext";
import { UserProvider } from "./context/UserContext";
import { Toaster } from "react-hot-toast";

function App() {
  let paths = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "movie/:id", element: <Card /> },
        { path: "movies", element: <Movies /> },
        { path: "tvshows", element: <TVShows /> },
        { path: "popular", element: <Popular /> },
        { path: "search", element: <Search /> },
        { path: "genre/:id", element: <GenreMovies /> },
        { path: "watchlist", element: <ProtectedRoute><Watchlist /></ProtectedRoute> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return (
    <UserProvider>
      <WatchlistProvider>
        <Toaster position="bottom-right" />
        <RouterProvider router={paths} />
      </WatchlistProvider>
    </UserProvider>
  );
}

export default App;
