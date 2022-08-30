import React from 'react'
import { Link, Route, withRouter } from 'react-router-dom'
import AdminDashboardCss from './AdminDashboard.module.scss'
import DashboardProfile from '../DashboardProfile/DashboardProfile'
import DataBox from '../DataBox/DataBox'
import FacultyRequests from '../FacultyRequests/FacultyRequests'
import ReceivedMessages from '../ReceivedMessages/ReceivedMessages'
import { useDispatch } from 'react-redux'
import { getUsersStart } from '../../redux/user/user.action'
import Form3 from '../AddReports/Form3'
const AdminDashboard = ({ match }) => {
 const dispatch = useDispatch()
 React.useEffect(() => {
  dispatch(getUsersStart())
 }, [dispatch])
 // dispatch(getUsersStart())

 let profile = false
 let manage = false
 let addReports = false
 let messages = false

 if (window.location.href.indexOf('manage-faculty') > -1) {
  manage = true
 } else if (window.location.href.indexOf('add-report') > -1) {
  addReports = true
 } else if (window.location.href.indexOf('messages') > -1) {
  messages = true
 } else if (window.location.href.indexOf('dashboard') > -1) {
  profile = true
 }
 return (
  <div className={AdminDashboardCss.container}>
   <nav>
    <ul>
     <li>
      <Link
       to={`${match.path}`}
       style={
        profile
         ? {
            color: '#d82a4e',
            borderBottom: '5px solid #d82a4e',
           }
         : null
       }
      >
       Profile
      </Link>
     </li>
     <li>
      <Link
       to={`${match.path}/add-report`}
       style={
        addReports
         ? {
            color: '#d82a4e',
            borderBottom: '5px solid #d82a4e',
           }
         : null
       }
      >
       Report Crime
      </Link>
     </li>
     <li>
      <Link
       to={`${match.path}/manage-faculty`}
       style={
        manage
         ? {
            color: '#d82a4e',
            borderBottom: '5px solid #d82a4e',
           }
         : null
       }
      >
       My Reports
      </Link>
     </li>
     <li>
      <Link
       to={`${match.path}/received-messages`}
       style={
        messages
         ? {
            color: '#d82a4e',
            borderBottom: '5px solid #d82a4e',
           }
         : null
       }
      >
       Recived Messages
      </Link>
     </li>
    </ul>
   </nav>
   <Route exact path={`${match.path}`} component={DashboardProfile} />
   <Route exact path={`${match.path}/manage-faculty`} component={DataBox} />
   <Route exact path={`${match.path}/add-report`} component={Form3} />
   <Route
    exact
    path={`${match.path}/received-messages`}
    component={ReceivedMessages}
   />
  </div>
 )
}

export default withRouter(AdminDashboard)
