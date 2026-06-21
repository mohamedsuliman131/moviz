import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import axios from 'axios'
import styles from './Search.module.css'

const API_KEY = '8d40b1f5e43ec4c07e7e5d8c6d766eb0'

export default function Search() {

  // useSearchParams reads the URL — example: /search?q=batman  →  query = "batman"
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')

  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  // runs every time the query in the URL changes
  useEffect(() => {
    window.scrollTo(0, 0)
    setResults([])
    setLoading(true)

    async function getData() {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      )
      setResults(res.data.results)
      setLoading(false)
    }

    if (query) getData()
  }, [query])

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className="spinner-border text-danger" role="status"></div>
      </div>
    )
  }

  return (
    <div className={styles.page}>

      <h2 className={styles.heading}>
        Results for: <span className={styles.red}>"{query}"</span>
      </h2>

      {results.length === 0 && <p className={styles.noResults}>No movies found.</p>}

      <div className={styles.grid}>
        {results.map((movie) => (
          movie.poster_path && (
            <Link to={`/movie/${movie.id}`} key={movie.id} className={styles.cardLink}>
              <div className={styles.card}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.poster}
                />
                <div className={styles.cardOverlay}>
                  <span className={styles.rating}>⭐ {movie.vote_average.toFixed(1)}</span>
                  <p className={styles.cardTitle}>{movie.title}</p>
                </div>
              </div>
            </Link>
          )
        ))}
      </div>

    </div>
  )
}
