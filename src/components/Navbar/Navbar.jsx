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
    <nav className={styles.navbar}>

      <div className={styles.left}>
        <Link to="/" className={styles.logo}>Moviz</Link>

        <ul className={styles.navLinks}>
          <li><Link to="/" className={isActive('/')}>Home</Link></li>
          <li><Link to="/movies" className={isActive('/movies')}>Movies</Link></li>
          <li><Link to="/tvshows" className={isActive('/tvshows')}>TV Shows</Link></li>
          <li><Link to="/popular" className={isActive('/popular')}>New & Popular</Link></li>
          <li><Link to="/watchlist" className={isActive('/watchlist')}>Watchlist</Link></li>
        </ul>
      </div>

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

    </nav>
  )
}
