import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import FacultyProfileCss from './FacultyProfile.module.scss'
import { connect } from 'react-redux'

import {
  facultySelectorByParam,
  facultySelectorByUid,
} from '../../redux/data/data.selectors'

const mapStateToProps = (state, ownProps) => {
  return {
    facultySelector: ownProps.location.uid
      ? facultySelectorByUid(ownProps.location.uid)(state)
      : facultySelectorByParam(ownProps.match.params.id)(state),
  }
}

const FacultyProfile = ({ history, facultySelector }) => {
  window.onscroll = function () {
    myFunction()
  }
  React.useEffect(() => {
    if (facultySelector.length > 0) {
      // history.push(`/faculty/${facultySelector[0].personal?.fm_name}`)
      const { personal, qualification, faculty } = facultySelector[0]
      setF({
        name: personal?.fm_name,
        phone: personal?.fm_phone,
        email: personal?.fm_email,
        image: personal?.imgurl,
        qualification: qualification,
        ...facultySelector[0],
      })
    }
    // eslint-disable-next-line
  }, [])
  const [state, setstate] = React.useState(false)
  const [f, setF] = React.useState({
    name: 'null',
    department: 'null',
    designation: 'null',
    city: 'null',
    country: 'null',
    phone: 'null',
    email: 'null',
    image: 'null',
    courses: [],
    experties: [],
    qualification: [],
    interests: '',
  })
  console.log(facultySelector)
  function myFunction() {
    if (window.pageYOffset >= 300) {
      setstate(true)
    } else {
      setstate(false)
    }
  }
  return (
    <div className={FacultyProfileCss.container}>
      <div
        className={`${FacultyProfileCss.head}`}
        style={
          state
            ? {
                position: 'fixed',
                top: 0,
                boxShadow: '0 2px 5px 0 rgb(0 0 0 / 16%)',
              }
            : { position: 'unset', boxShadow: 'unset' }
        }
      >
        {'News'}
      </div>

      <div
        className={FacultyProfileCss.section}
        style={state ? { marginTop: '150px' } : null}
      >
        <div className={FacultyProfileCss.left}>
          <div className={FacultyProfileCss.img}>
            <img
              src={
                'https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg'
              }
              alt=""
            />
          </div>
          <div className={FacultyProfileCss.info}>
            <h3>REPORTER INFO</h3>
            <hr className={FacultyProfileCss.hr} />
            <p>Name: {f.displayName},</p>
            <p> {f.displayName}</p>
            <p>
              {' '}
              {f.city}, {f.country}
            </p>
            <p> Ph: {f.phone}</p>
            <p> Email: {f.email}</p>
            <div className={FacultyProfileCss.button}>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
        </div>
        <div className={FacultyProfileCss.right}>
          <div className={FacultyProfileCss.header}>
            <h2>{f.type}</h2>
            <div className={FacultyProfileCss.desg}>{f.details}</div>
            {/* <div className={FacultyProfileCss.deg}>{f.institute}</div> */}
          </div>

          {/* <div className={FacultyProfileCss.row}>
            <h3>BIOGRAPHY</h3>
            <hr className={FacultyProfileCss.hr} />
            <p>
              Dr. Sara has done her PhD in Entrepreneurship from University of
              Exeter, United Kingdom. Before her PhD, she did MSc. International
              Management (Entrepreneurship and Innovation) with Distinction from
              University of Exeter, United Kingdom. Prior to joining ITU full
              time, she has been working as a Visiting Faculty of
              Entrepreneurship for the EMBITE program since 2018. She has
              received extensive trainings for startups and academic trainings
              including Learning and Teaching in Higher Education (LTHE) Stage 1
              and Researcher Development from University of Exeter. She has also
              has been involved in advisory roles for students as well as
              startups both in Pakistan and United Kingdom.
            </p>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default withRouter(connect(mapStateToProps, null)(FacultyProfile))
