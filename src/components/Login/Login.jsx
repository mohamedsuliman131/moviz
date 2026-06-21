import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate, Link } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import styles from './Login.module.css'

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
})

export default function Login() {
  const navigate = useNavigate()
  const { login } = useUser()
  const [error, setError] = useState('')

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: (values) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find((u) => u.email === values.email && u.password === values.password)
      if (!user) {
        setError('Invalid email or password')
        return
      }
      login(user)
      navigate('/')
    },
  })

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2 className={styles.title}>Sign In</h2>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={formik.handleSubmit}>

          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.email && formik.errors.email ? styles.invalid : ''}
            />
            {formik.touched.email && formik.errors.email && (
              <span className={styles.errorMsg}>{formik.errors.email}</span>
            )}
          </div>

          <div className={styles.field}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.password && formik.errors.password ? styles.invalid : ''}
            />
            {formik.touched.password && formik.errors.password && (
              <span className={styles.errorMsg}>{formik.errors.password}</span>
            )}
          </div>

          <button type="submit" className={styles.btn}>Sign In</button>
        </form>

        <p className={styles.switchLink}>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}
