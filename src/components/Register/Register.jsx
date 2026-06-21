import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate, Link } from 'react-router-dom'
import styles from './Register.module.css'

const validationSchema = Yup.object({
  name: Yup.string().min(3, 'Name must be at least 3 characters').required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  rePassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords do not match').required('Please confirm your password'),
})

export default function Register() {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', rePassword: '' },
    validationSchema,
    onSubmit: (values) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const exists = users.find((u) => u.email === values.email)
      if (exists) {
        setError('This email is already registered')
        return
      }
      users.push({ name: values.name, email: values.email, password: values.password })
      localStorage.setItem('users', JSON.stringify(users))
      navigate('/login')
    },
  })

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2 className={styles.title}>Create Account</h2>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={formik.handleSubmit}>

          <div className={styles.field}>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.name && formik.errors.name ? styles.invalid : ''}
            />
            {formik.touched.name && formik.errors.name && (
              <span className={styles.errorMsg}>{formik.errors.name}</span>
            )}
          </div>

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

          <div className={styles.field}>
            <label>Confirm Password</label>
            <input
              type="password"
              name="rePassword"
              placeholder="Re-enter your password"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.rePassword && formik.errors.rePassword ? styles.invalid : ''}
            />
            {formik.touched.rePassword && formik.errors.rePassword && (
              <span className={styles.errorMsg}>{formik.errors.rePassword}</span>
            )}
          </div>

          <button type="submit" className={styles.btn}>Sign Up</button>
        </form>

        <p className={styles.switchLink}>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  )
}
