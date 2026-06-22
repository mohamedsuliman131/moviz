import styles from './HomePage.module.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const API_KEY = '8d40b1f5e43ec4c07e7e5d8c6d766eb0'

export default function HomePage() {

  const navigate = useNavigate()
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      try {
        const moviesRes = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
        const genresRes = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
        setMovies(moviesRes.data.results)
        setGenres(genresRes.data.genres)
      } catch (err) {
        console.error(err)
      }
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

      {/* Hero */}
      <div className={styles.hero}>
        <h1>Welcome to <span className={styles.red}>Moviz</span></h1>
        <p>Your destination for discovering and reviewing your favorite films.</p>
        <div className={styles.buttons}>
          <Link to="/movies" className={styles.btnRed}>Explore Movies</Link>
          <Link to="/watchlist" className={styles.btnWhite}>Create Watchlist</Link>
        </div>
      </div>

      {/* Popular Movies */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Popular Movies</h3>
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
          {movies.map((movie) => (
            <div className="col" key={movie.id}>
              <Link to={`/movie/${movie.id}`} className={styles.cardLink}>
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
            </div>
          ))}
        </div>
      </div>

      {/* Genres */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Our Genres</h3>
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          spaceBetween={14}
          slidesPerView={2}
          breakpoints={{
            480:  { slidesPerView: 3 },
            768:  { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
        >
          {genres.map((genre) => (
            <SwiperSlide key={genre.id}>
              <div
                className={styles.genre}
                onClick={() => navigate(`/genre/${genre.id}`, { state: { name: genre.name } })}
              >
                {genre.name}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
  )
}
