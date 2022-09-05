import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signUp } from '../../redux/user/user.action'
import SignupCss from './SignupForm.module.scss'
import { Loading } from '../../redux/user/user.selector'
import { Spinner } from '../spinner/spinner'
import TextField from '../TextField/TextField'
import * as yup from 'yup'
const userValidator = yup.object().shape({
 name: yup.string().required('Name is required'),
 address: yup.string().required('Address is required'),
 phone: yup.string().required('Phone is required'),
 type: yup.string().required('Please select role in  order to continue'),
 email: yup
  .string()
  .email('Please enter a valid email.')
  .required('Email is required'),
 password: yup
  .string()
  .min(6, 'Password must be at least 6 characters long')
  .required('Password is required'),
})
const sOfficerValidator = yup.object().shape({
 name: yup.string().required('Name is required'),
 address: yup.string().required('Address is required'),
 phone: yup.string().required('Phone is required'),
 type: yup.string().required('Please select role in  order to continue'),
 rank: yup.string().required('Rank is required'),
 department: yup.string().required('Department is required'),
 email: yup
  .string()
  .email('Please enter a valid email.')
  .required('Email is required'),
 password: yup
  .string()
  .min(6, 'Password must be at least 6 characters long')
  .required('Password is required'),
})
const SignupForm = () => {
 const loading = useSelector((s) => Loading(s))
 const dispatch = useDispatch()
 const [state, setstate] = React.useState({
  name: '',
  email: '',
  phone: '',
  address: '',
  department: '',
  rank: '',
  password: '',
  cpassword: '',
  type: '',
 })
 const [errors, setErrors] = useState({})
 const handleChange = (event) => {
  setErrors({ ...errors, [event.target.name]: null })
  setstate({ ...state, [event.target.name]: event.target.value })
 }
 const handleSubmit = (event) => {
  event.preventDefault()
  try {
   if (state.type === 'sofficer') {
    sOfficerValidator.validateSync(state, { abortEarly: false })
   } else {
    userValidator.validateSync(state, { abortEarly: false })
   }
   if (state.password !== state.cpassword) {
    setErrors({ ...errors, cpassword: 'Confirm Password does not matched' })
    return
   }
   dispatch(signUp(state))
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

 return (
  <div className={SignupCss.container}>
   <form onSubmit={handleSubmit}>
    <h4>Register to CRI Portal</h4>
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
    {state.type && (
     <>
      <TextField
       error={errors.name}
       type='text'
       name='name'
       placeholder='Full Name'
       onChange={handleChange}
       value={state.name}
      />
      <TextField
       error={errors.phone}
       type='text'
       value={state.phone}
       name='phone'
       placeholder='Contact Number'
       onChange={handleChange}
      />
      <TextField
       error={errors.address}
       type='text'
       value={state.address}
       name='address'
       placeholder='Address'
       onChange={handleChange}
      />
      {state.type === 'officer' && (
       <>
        <TextField
         error={errors.department}
         type='text'
         value={state.department}
         name='department'
         placeholder='Department'
         onChange={handleChange}
        />
        <TextField
         error={errors.rank}
         type='text'
         value={state.rank}
         name='rank'
         placeholder='Rank'
         onChange={handleChange}
        />
       </>
      )}
      <TextField
       error={errors.email}
       type='text'
       name='email'
       value={state.email}
       placeholder='Email'
       onChange={handleChange}
      />
      <TextField
       error={errors.password}
       type='password'
       name='password'
       value={state.password}
       placeholder='Password'
       onChange={handleChange}
      />
      <TextField
       error={errors.cpassword}
       type='password'
       name='cpassword'
       value={state.cpassword}
       placeholder='Confirm Password'
       onChange={handleChange}
      />
      <div className={SignupCss.check}>
       <input type='checkbox' />
       <label>
        By signing up, I agree to CRI's <span>Terms of Services</span>
       </label>
      </div>
     </>
    )}
    <input type='submit' value='Continue' />
    <p>
     Already have an account? <Link to='/login'>Sign in </Link>
    </p>
   </form>
   <div className={SignupCss.sociallinks}>
    <p>Sign in with</p>
    <span>
     <div className={SignupCss.img}>
      <img src='images/google.svg' alt='' />
     </div>
     <div className={SignupCss.img}>
      <img src='images/fb.svg' alt='' />
     </div>
    </span>
   </div>
   {loading ? <Spinner /> : null}
  </div>
 )
}
export default SignupForm
