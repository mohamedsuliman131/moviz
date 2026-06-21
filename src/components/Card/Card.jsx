import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import styles from './Card.module.css'
import { useWatchlist } from '../../context/WatchlistContext'
import toast from 'react-hot-toast'

const API_KEY = '8d40b1f5e43ec4c07e7e5d8c6d766eb0'
const BASE_URL = 'https://api.themoviedb.org/3'
const IMG_URL = 'https://image.tmdb.org/t/p'

export default function Card() {

  const { id } = useParams()
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist()

  const [movie,   setMovie]   = useState(null)
  const [cast,    setCast]    = useState([])
  const [trailer, setTrailer] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    setMovie(null)
    setCast([])
    setTrailer(null)
    setLoading(true)

    async function getData() {
      try {
        const movieRes   = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
        const creditsRes = await axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`)
        const videosRes  = await axios.get(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`)

        setMovie(movieRes.data)
        setCast(creditsRes.data.cast.slice(0, 8))

        const youtubeTrailer = videosRes.data.results.find(
          (video) => video.site === 'YouTube' && video.type === 'Trailer'
        )
        setTrailer(youtubeTrailer)
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }
    getData()
  }, [id])

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className="spinner-border text-danger" role="status"></div>
      </div>
    )
  }

  if (!movie) return null

  const hours   = movie.runtime ? Math.floor(movie.runtime / 60) : 0
  const minutes = movie.runtime ? movie.runtime % 60 : 0
  const year    = movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'

  return (
    <div className={styles.page}>

      {/* ── HERO ── */}
      <div
        className={styles.hero}
        style={{ backgroundImage: `url(${IMG_URL}/original${movie.backdrop_path})` }}
      >
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>

            <Link to="/" className={styles.backBtn}>← Back</Link>

            <div className={styles.movieRow}>

              <img
                src={`${IMG_URL}/w342${movie.poster_path}`}
                alt={movie.title}
                className={styles.poster}
              />

              <div className={styles.info}>
                <h1 className={styles.title}>{movie.title}</h1>

                <p className={styles.meta}>
                  <span className={styles.star}>⭐ {movie.vote_average.toFixed(1)}</span>
                  <span className={styles.dot}>·</span>
                  <span>{year}</span>
                  <span className={styles.dot}>·</span>
                  <span>{movie.runtime ? `${hours}h ${minutes}m` : 'N/A'}</span>
                </p>

                <div className={styles.genres}>
                  {movie.genres.map((g) => (
                    <span key={g.id} className={styles.genre}>{g.name}</span>
                  ))}
                </div>

                <p className={styles.overview}>{movie.overview}</p>

                <button
                  className={styles.watchlistBtn}
                  onClick={() => {
                    if (isInWatchlist(movie.id)) {
                      removeFromWatchlist(movie.id)
                      toast.error('Removed from Watchlist')
                    } else {
                      addToWatchlist({ id: movie.id, title: movie.title, poster_path: movie.poster_path, vote_average: movie.vote_average })
                      toast.success('Added to Watchlist')
                    }
                  }}
                >
                  {isInWatchlist(movie.id) ? '✅ Added to Watchlist' : '➕ Add to Watchlist'}
                </button>

              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── TRAILER ── */}
      {trailer && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Trailer</h3>
          <div className={styles.trailerBox}>
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Trailer"
              allowFullScreen
              className={styles.trailer}
            />
          </div>
        </div>
      )}

      {/* ── CAST ── */}
      {cast.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Cast</h3>
          <div className={styles.castRow}>
            {cast.map((actor) => (
              <div key={actor.id} className={styles.actor}>
                <img
                  src={
                    actor.profile_path
                      ? `${IMG_URL}/w185${actor.profile_path}`
                      : 'https://placehold.co/100x100/1e293b/ffffff?text=?'
                  }
                  alt={actor.name}
                  className={styles.actorImg}
                />
                <p className={styles.actorName}>{actor.name}</p>
                <p className={styles.actorRole}>{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
