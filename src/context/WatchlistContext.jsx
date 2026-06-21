import { createContext, useContext, useState } from 'react'

const WatchlistContext = createContext()

export function WatchlistProvider({ children }) {

  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist')
    return saved ? JSON.parse(saved) : []
  })

  function addToWatchlist(movie) {
    const updated = [...watchlist, movie]
    setWatchlist(updated)
    localStorage.setItem('watchlist', JSON.stringify(updated))
  }

  function removeFromWatchlist(movieId) {
    const updated = watchlist.filter((m) => m.id !== movieId)
    setWatchlist(updated)
    localStorage.setItem('watchlist', JSON.stringify(updated))
  }

  function isInWatchlist(movieId) {
    return watchlist.some((m) => m.id === movieId)
  }

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  )
}

export function useWatchlist() {
  return useContext(WatchlistContext)
}
