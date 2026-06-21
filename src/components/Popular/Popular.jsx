import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styles from './Popular.module.css'

const API_KEY = '8d40b1f5e43ec4c07e7e5d8c6d766eb0'

export default function Popular() {

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    async function getData() {
      const res = await axios.get(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`
      )
      setItems(res.data.results)
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
      <h2 className={styles.heading}>New & <span className={styles.red}>Popular</span></h2>

      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
        {items.map((item) => (
          item.poster_path && (
            <div className="col" key={item.id}>
              <Link to={`/movie/${item.id}`} className={styles.cardLink}>
                <div className={styles.card}>
                  <img
                    src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                    alt={item.title || item.name}
                    className={styles.poster}
                  />
                  <div className={styles.overlay}>
                    <span className={styles.rating}>⭐ {item.vote_average.toFixed(1)}</span>
                    <p className={styles.cardTitle}>{item.title || item.name}</p>
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
