import React from 'react'
import LoginFormCss from './LoginForm.module.scss'
import { Link, withRouter } from 'react-router-dom'
import {
 forgetPassword,
 signInWithEmailStart,
 signInWithGoogleStart,
} from '../../redux/user/user.action'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { Loading } from '../../redux/user/user.selector'
import { Spinner } from '../spinner/spinner'
import TextField from '../TextField/TextField'
const loginValidator = yup.object().shape({
 email: yup
  .string()
  .email('Please enter a valid email.')
  .required('Email is required'),
 type: yup.string().required('Please specifiy role '),
 password: yup
  .string()
  .min(6, 'Password must be at least 6 characters long')
  .required('Password is required'),
})
const LoginForm = () => {
 const loading = useSelector((s) => Loading(s))
 const dispatch = useDispatch()
 const [state, setstate] = React.useState({ email: '', password: '', type: '' })
 const [errors, setErrors] = React.useState({ email: '', password: '' })
 const handleSubmit = async (event) => {
  event.preventDefault()
  try {
   loginValidator.validateSync(state, { abortEarly: false })

   dispatch(signInWithEmailStart(state))
   setstate({ ...state, password: '' })
  } catch (error) {
   if (error.name === 'ValidationError') {
    let obj = {}
    for (let e of error.inner) {
     obj[e.path] = e.message
    }
    setErrors(obj)
   }
  }
 }
 const handleChange = (event) => {
  setstate({ ...state, [event.target.name]: event.target.value })
 }
 const handleGoogle = () => {
  dispatch(signInWithGoogleStart())
 }
 return (
  <div className={LoginFormCss.container}>
   <form onSubmit={handleSubmit}>
    <h4>Sign in to Faculty Directory</h4>

    <TextField
     error={errors.email}
     type='email'
     placeholder='Email'
     name='email'
     value={state.email}
     onChange={handleChange}
    />
    <TextField
     error={errors.password}
     type='password'
     placeholder='Password'
     name='password'
     onChange={handleChange}
     value={state.password}
    />
    <select
     value={state.type}
     name='type'
     onChange={(e) => {
      setErrors({})
      handleChange(e)
     }}
     style={
      errors.type && {
       border: '1px solid rgb(220, 38, 38)',
       color: 'rgb(220, 38, 38)',
      }
     }
    >
     <option value='' disabled>
      Select Role
     </option>
     <option value='reporter'>Informer/Reporter</option>
     <option value={'officer'}>Investigation officer/ Police</option>
     <option value={'sofficer'}>Senior Officer (SO)</option>
    </select>
    <span
     style={
      errors.type && {
       color: 'rgb(220, 38, 38)',
       fontSize: '14px',
       fontWeight: 'bold',
       marginTop: '5px',
      }
     }
    >
     {errors.type}
    </span>
    <div
     className={LoginFormCss.a}
     onClick={() => {
      const email = prompt('Enter Email')
      dispatch(forgetPassword(email))
     }}
    >
     Forget password?
    </div>
    <input type='submit' value='Sign in' />
    <p>
     Don't have an account? <Link to='/register'> Sign up</Link>{' '}
    </p>
   </form>
   <div className={LoginFormCss.sociallinks}>
    <p>Sign in with</p>
    <span>
     <div className={LoginFormCss.img} style={{ display: 'none' }}>
      <img src='images/google.svg' alt='' onClick={() => handleGoogle()} />
     </div>
     <div className={LoginFormCss.img}>
      <img src='images/fb.svg' alt='' />
     </div>
    </span>
   </div>
   {loading ? <Spinner /> : null}
  </div>
 )
}
export default withRouter(LoginForm)
