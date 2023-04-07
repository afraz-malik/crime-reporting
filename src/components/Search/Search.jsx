import React from 'react'
import SearchCss from './Search.module.scss'
import { useSelector } from 'react-redux'
import {
  getUniversities,
  getDepartments,
  getCourses,
  getExperties,
  facultySelectorList,
} from '../../redux/data/data.selectors'

import { filter } from 'smart-array-filter'
import FacultyCard from '../FacultyCard/FacultyCard'
import { withRouter } from 'react-router-dom'

const Search = ({ location, ...props }) => {
  const faculty = useSelector((state) => facultySelectorList(state))
  const universities = useSelector((state) => getUniversities(state)).sort()
  const departments = useSelector((state) => getDepartments(state)).sort()
  const courses = useSelector((state) => getCourses(state)).sort()
  const experties = useSelector((state) => getExperties(state)).sort()
  const [active, setactive] = React.useState({
    keyword: false,
    university: location.university ? true : false,
    department: location.department ? true : false,
    course: location.course ? true : false,
    professional: false,
    experty: false,
    filter: false,
  })
  const [state, setstate] = React.useState({
    university: location.university ? location.university : '',
    keyword: '',
    department: location.department ? location.department : '',
    course: location.course ? location.course : '',
    experty: '',
    professional: '',
  })
  const handleChange = (event) => {
    setstate({ ...state, [event.target.name]: event.target.value })
  }
  const handleClear = (event) => {
    setstate({ ...state, [event.target.id]: '' })
    setactive({ ...active, [event.target.id]: false })
  }
  const clearFocus = (e) => {
    if (e.target.value === '') {
      setactive({ ...active, [e.target.id]: false })
    }
  }

  const handleFocus = (e) => {
    setactive({
      key: false,
      uni: false,
      dept: false,
      course: false,
      pi: false,
      area: false,
    })
    setactive({
      ...active,
      [e.target.id]: true,
    })
  }

  // const filter1 = filter(faculty, {
  //   // limit: 1,
  //   keywords: `personal?.fm_name:${state?.keyword}`,
  //   caseSensitive: false,
  // })
  // const filter2 = filter(filter1, {
  //   // limit: 1,
  //   keywords: `faculty?.fm_university:${state?.university}`,
  //   caseSensitive: false,
  // })

  // const filter3 = filter(filter2, {
  //   // limit: 1,
  //   keywords: `faculty?.fm_department:${state?.department}`,
  //   caseSensitive: false,
  // })
  // const filter4 = filter(filter3, {
  //   // limit: 1,
  //   keywords: `faculty?.fm_courses:${state?.course}`,
  //   caseSensitive: false,
  // })
  // const filter5 = filter(filter4, {
  //   // limit: 1,
  //   keywords: `faculty?.fm_experties:${state?.experty}`,
  //   caseSensitive: false,
  // })
  // const filter6 = filter(filter5, {
  //   // limit: 1,
  //   keywords: `faculty?.fm_interests:${state?.professional}`,
  //   caseSensitive: false,
  // })

  return (
    <>
      {faculty.length > 0 ? (
        <div className={SearchCss.cards}>
          {faculty
            .filter((el) => el.news)
            .map((el, i) => (
              <FacultyCard key={i} el={el} />
            ))}
        </div>
      ) : (
        <img src="images/notfound.png" alt="" />
      )}
    </>
  )
}

export default withRouter(Search)
