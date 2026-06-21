import { Link } from 'react-router-dom'
import { useWatchlist } from '../../context/WatchlistContext'
import styles from './Watchlist.module.css'
import toast from 'react-hot-toast'

const IMG_URL = 'https://image.tmdb.org/t/p'

export default function Watchlist() {

  const { watchlist, removeFromWatchlist } = useWatchlist()

  return (
    <div className={styles.page}>

      {watchlist.length === 0 && (
        <div className={styles.empty}>
          <p>No movies in your watchlist yet.</p>
          <Link to="/">Browse Movies</Link>
        </div>
      )}

      {watchlist.length > 0 && (
        <>
          <h2 className={styles.title}>My Watchlist</h2>

          <div className={styles.grid}>
            {watchlist.map((movie) => (
              <div key={movie.id} className={styles.card}>

                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={movie.poster_path ? `${IMG_URL}/w300${movie.poster_path}` : 'https://placehold.co/300x450/1e293b/ffffff?text=No+Image'}
                    alt={movie.title}
                    className={styles.poster}
                  />
                </Link>

                <div className={styles.info}>
                  <p className={styles.movieTitle}>{movie.title}</p>
                  <p className={styles.rating}>⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</p>
                  <button
                    className={styles.removeBtn}
                    onClick={() => {
                  removeFromWatchlist(movie.id)
                  toast.error('Removed from Watchlist')
                }}
                  >
                    Remove
                  </button>
                </div>

              </div>
            ))}
          </div>
        </>
      )}

    </div>
  )
}
