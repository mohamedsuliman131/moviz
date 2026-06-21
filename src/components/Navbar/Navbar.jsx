import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import styles from './Navbar.module.css'

export default function Navbar() {

  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useUser()

  function handleSearch(e) {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/search?q=${search.trim()}`)
      setSearch('')
    }
  }

  function isActive(path) {
    return location.pathname === path ? styles.active : ''
  }

  return (
    <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
      <div className="container-fluid px-3">

        <Link to="/" className={`navbar-brand ${styles.logo}`}>Moviz</Link>

        <button
          className={`navbar-toggler ${styles.toggler}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-controls="navMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${styles.navLinks}`}>
            <li className="nav-item"><Link to="/" className={`nav-link ${styles.navLink} ${isActive('/')}`}>Home</Link></li>
            <li className="nav-item"><Link to="/movies" className={`nav-link ${styles.navLink} ${isActive('/movies')}`}>Movies</Link></li>
            <li className="nav-item"><Link to="/tvshows" className={`nav-link ${styles.navLink} ${isActive('/tvshows')}`}>TV Shows</Link></li>
            <li className="nav-item"><Link to="/popular" className={`nav-link ${styles.navLink} ${isActive('/popular')}`}>New & Popular</Link></li>
            <li className="nav-item"><Link to="/watchlist" className={`nav-link ${styles.navLink} ${isActive('/watchlist')}`}>Watchlist</Link></li>
          </ul>

          <div className={styles.right}>
            <form onSubmit={handleSearch} className={styles.searchBox}>
              <input
                type="text"
                placeholder="Search titles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>

            {user ? (
              <div className={styles.userArea}>
                <span className={styles.userName}>👤 {user.name}</span>
                <button className={styles.logoutBtn} onClick={() => { logout(); navigate('/') }}>
                  Logout
                </button>
              </div>
            ) : (
              <div className={styles.authIcons}>
                <Link to="/login" className={styles.authIcon} title="Sign In">
                  <i className="fas fa-sign-in-alt"></i>
                </Link>
                <Link to="/register" className={styles.authIcon} title="Sign Up">
                  <i className="fas fa-user-plus"></i>
                </Link>
              </div>
            )}
          </div>
        </div>

      </div>
    </nav>
  )
}
