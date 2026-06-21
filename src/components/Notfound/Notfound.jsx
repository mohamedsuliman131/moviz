import { Link } from 'react-router-dom'
import styles from './Notfound.module.css'

export default function Notfound() {
  return (
    <div className={styles.page}>

      <h1 className={styles.code}>404</h1>
      <p className={styles.title}>Page Not Found</p>
      <p className={styles.subtitle}>The page you're looking for doesn't exist.</p>

      <Link to="/" className={styles.btn}>← Back to Home</Link>

    </div>
  )
}
