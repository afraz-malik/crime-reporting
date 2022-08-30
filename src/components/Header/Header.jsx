import React from 'react'
import HeaderCss from './Header.module.scss'
import Navbar from '../Navbar/Navbar'
import { Link } from 'react-router-dom'

const Header = () => {
 const [state, setstate] = React.useState({
  course: '',
  university: '',
 })
 return (
  <div
   className={HeaderCss.header}
   style={{
    backgroundImage: `url('https://media.istockphoto.com/vectors/crime-scene-magnifying-glass-with-fingerprint-vector-id1130508384?k=20&m=1130508384&s=612x612&w=0&h=tEAQgRgE5IjHYNpzXDR4wu1tNFXVNSULVXxefJk1GI0=')`,
   }}
  >
   <Navbar />
   <div className={HeaderCss.body}>
    <div className={HeaderCss.title}>
     <h3>Crime Reporting & Investigation System</h3>
     <p>
      The world fasteste crime reporting and investigation system. From here you
      can get the latest crime reporting and investigation in a quick touch.
     </p>
    </div>
    <div className={HeaderCss.input}>
     <input
      type='text'
      placeholder='News'
      value={state.course}
      onChange={(e) => setstate({ ...state, course: e.target.value })}
     />
     <input
      type='text'
      placeholder='Type'
      value={state.university}
      onChange={(e) => setstate({ ...state, university: e.target.value })}
     />
     <Link
      to={{
       pathname: `/faculty`,
       university: state.university,
       course: state.course,
      }}
     >
      {' '}
      Search Crime-News
     </Link>
    </div>
   </div>
  </div>
 )
}

export default Header
