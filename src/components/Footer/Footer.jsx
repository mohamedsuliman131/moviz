import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        <div className={styles.brand}>
          <span className={styles.logo}>Moviz</span>
          <p className={styles.tagline}>Your go-to destination for movies, TV shows, and what's trending.</p>
        </div>

        <div className={styles.links}>
          <h4 className={styles.heading}>Browse</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/movies">Movies</Link></li>
            <li><Link to="/tvshows">TV Shows</Link></li>
            <li><Link to="/popular">New & Popular</Link></li>
          </ul>
        </div>

        <div className={styles.links}>
          <h4 className={styles.heading}>Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Use</a></li>
          </ul>
        </div>

        <div className={styles.links}>
          <h4 className={styles.heading}>Follow Us</h4>
          <ul>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">YouTube</a></li>
          </ul>
        </div>

      </div>

      <div className={styles.bottom}>
        <span>&copy; 2026 Moviz. All rights reserved.</span>
      </div>
    </footer>
  )
}
