import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import FormCss from './Form.module.css'
import TextField from '../TextField/TextField'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { addFaculty } from '../../redux/data/data.actions.js'
import moment from 'moment/moment.js'
const initialState = {
  type: '',
  date: '',
  time: '',
  details: '',
  location: '',
  images: '',
}

const schema = yup.object().shape({
  type: yup.string().required('This field is required'),
  date: yup.string().required('This field is required'),
  time: yup.string().required('This field is required'),
  details: yup.string().required('This field is required'),
  location: yup.string().required('This field is required'),
})
const Form1 = ({ submitForm, collectData }) => {
  const currentUser = useSelector((state) => state.userReducer.currentUser)

  const [state, setState] = useState(initialState)
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})
  const handleChange = (event) => {
    setErrors({ ...errors, [event.target.name]: null })
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      schema.validateSync(state, { abortEarly: false })
      if (!state.images) {
        setErrors({ ...errors, images: 'Please Select Evidence file' })
        return
      }
      const result = window.confirm(
        'Are you sure you have verified all record and want to proceed? (Strict Action will be taken against false information)'
      )
      if (result) {
        // console.log(state)
        dispatch(addFaculty({ ...currentUser, ...state }))
      }
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
  const handleImage = (event) => {
    console.log(event.target.files.length)
    setState({
      ...state,
      imgurl:
        event.target.files.length > 0
          ? URL.createObjectURL(event.target.files[0])
          : state.imgurl,
      images: event.target.files[0],
    })
  }
  return (
    <div className={FormCss.container}>
      <form onSubmit={handleSubmit}>
        <h3>Report Crime</h3>
        <div className={FormCss.row}>
          <div className={FormCss.col50}>
            <br />
            <label htmlFor="fm_university">
              <i className="fa fa-user"></i> Type of Crime
            </label>
            <select
              value={state.type}
              name="type"
              onChange={(e) => {
                // setErrors({})
                handleChange(e)
              }}
              style={
                errors.type && {
                  border: '1px solid rgb(220, 38, 38)',
                  color: 'rgb(220, 38, 38)',
                }
              }
            >
              <option value="" disabled>
                Select Crime Type
              </option>
              <option value="asault">Asault</option>
              <option value={'false_imprisonment'}>False imprisonment</option>
              <option value={'kidnapping'}>Kidnapping</option>
              <option value={'robbery'}>Robbery/Theft</option>
              <option value={'murder'}>Murder</option>
              <option value={'rape'}>Rape</option>
              <option value={'drugs'}>Drug Crime</option>
              <option value={'harassments'}>Harrassments</option>
              <option value={'defamation'}>Defamation</option>
            </select>

            <br />
            <br />
            <label htmlFor="fm_designation">
              <i className="fal fa-map-marker-smile"></i> Date
            </label>
            <TextField
              max={moment().format('YYYY-MM-DD')}
              error={errors.date}
              type="date"
              id="date"
              name="date"
              placeholder="Date of Crime"
              value={state.date}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="date">
              <i className="far fa-building"></i> Time
            </label>
            <TextField
              max={new Date(state.date).getHours()}
              // max={'}
              type="time"
              id="time"
              name="time"
              placeholder="Time of Crime"
              value={state.time}
              onChange={handleChange}
            />

            <br />
            <label htmlFor="fm_interests">
              <i className="fas fa-user-tie"></i> Crime Details
            </label>
            <TextField
              error={errors.details}
              textarea="textarea"
              id="details"
              style={{ resize: 'none' }}
              name="details"
              placeholder="Enter Crime Details"
              value={state.details}
              onChange={handleChange}
              rows="4"
              cols="50"
            />

            <br />
            <label htmlFor="fm_country">
              <i className="fas fa-globe-asia"></i> Location
            </label>
            <TextField
              error={errors.location}
              type="text"
              id="location"
              name="location"
              placeholder="Location of Crime"
              value={state.location}
              onChange={handleChange}
            />

            <br />
            <label htmlFor="fm_country">
              <i className="fas fa-file"></i> Select Evidence
            </label>
            <TextField
              error={errors.images}
              type="file"
              id="location"
              name="location"
              placeholder="Select Evidence"
              //  value={state.location}
              onChange={handleImage}
            />
          </div>
        </div>
        <label className={FormCss.lastlabel}>
          <input type="checkbox" name="sameadr" required />{' '}
          <span>
            I hereby verified the above information is correct and verified as
            per Terms & Conditions of Faculty Directory of Multi University
          </span>
        </label>
        <div className={FormCss.cancel}>
          <input
            type="submit"
            className={FormCss.btn}
            // onClick={() => incState()}
            value="Next"
          />
        </div>
      </form>
      {/* {isLoading ? <Spinner /> : null} */}
    </div>
  )
}

export default withRouter(Form1)
