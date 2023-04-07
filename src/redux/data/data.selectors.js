import { createSelector } from 'reselect'

const dataSelector = (state) => state.dataReducer
export const messages = createSelector(
  [dataSelector],
  (dataReducer) => dataReducer.messages
)

export const Loading = createSelector(
  [dataSelector],
  (dataReducer) => dataReducer.sending
)
export const Success = createSelector(
  [dataSelector],
  (dataReducer) => dataReducer.success
)
export const facultySelectorList = createSelector(
  [dataSelector],
  (dataReducer) => {
    console.log(dataReducer)
    return dataReducer.faculties
  }
)
export const UsersSelector = createSelector(
  [dataSelector],
  (dataReducer) => dataReducer.users
)
export const facultySelectorByParam = (urlParams) =>
  createSelector([facultySelectorList], (faculties) => {
    console.log(urlParams)

    return faculties.filter((faculty) => {
      return faculty.id === urlParams
    })
  })

export const facultySelectorByUid = (uid) =>
  createSelector([facultySelectorList], (faculties) => {
    return faculties.filter((faculty) => faculty.id === uid)
  })

export const topFacultySelector = createSelector(
  [facultySelectorList],
  (faculties) => faculties.slice(0, 4)
)
const universities = []
export const getUniversities = createSelector(
  [facultySelectorList],
  (faculties) => {
    // faculties.map((faculty) =>
    //   universities.push(faculty.faculty?.fm_university)
    // )
    return faculties
  }
)
const departments = []
export const getDepartments = createSelector(
  [facultySelectorList],
  (faculties) => {
    // faculties.map((faculty) => departments.push(faculty.faculty.fm_department))
    return faculties
  }
)

var courses = []
export const getCourses = createSelector([facultySelectorList], (faculties) => {
  // faculties.map(
  // (faculty) => (courses = [...courses, ...faculty.faculty.fm_courses])
  // )
  return faculties
})
var experties = []
export const getExperties = createSelector(
  [facultySelectorList],
  (faculties) => {
    // faculties.map(
    //   (faculty) => (experties = [...experties, ...faculty.faculty.fm_experties])
    // )
    return faculties
  }
)
