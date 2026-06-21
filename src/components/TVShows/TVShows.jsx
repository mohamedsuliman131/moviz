import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styles from './TVShows.module.css'

const API_KEY = '8d40b1f5e43ec4c07e7e5d8c6d766eb0'

export default function TVShows() {

  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    async function getData() {
      const res = await axios.get(
        `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`
      )
      setShows(res.data.results)
      setLoading(false)
    }
    getData()
  }, [])

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className="spinner-border text-danger" role="status"></div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <h2 className={styles.heading}>Popular <span className={styles.red}>TV Shows</span></h2>

      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
        {shows.map((show) => (
          show.poster_path && (
            <div className="col" key={show.id}>
              <Link to={`/movie/${show.id}`} className={styles.cardLink}>
                <div className={styles.card}>
                  <img
                    src={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
                    alt={show.name}
                    className={styles.poster}
                  />
                  <div className={styles.overlay}>
                    <span className={styles.rating}>⭐ {show.vote_average.toFixed(1)}</span>
                    <p className={styles.cardTitle}>{show.name}</p>
                  </div>
                </div>
              </Link>
            </div>
          )
        ))}
      </div>
    </div>
  )
}
