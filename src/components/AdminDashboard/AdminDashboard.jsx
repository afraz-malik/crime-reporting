import React from 'react'
import { Link, Route, withRouter } from 'react-router-dom'
import AdminDashboardCss from './AdminDashboard.module.scss'
import DashboardProfile from '../DashboardProfile/DashboardProfile'
import DataBox from '../DataBox/DataBox'
import UsersBox from '../Users/DataBox'
import FacultyRequests from '../FacultyRequests/FacultyRequests'
import ReceivedMessages from '../ReceivedMessages/ReceivedMessages'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersStart } from '../../redux/user/user.action'
import Form3 from '../AddReports/Form3'
import AddCampaigns from './AddCampaigns.jsx'
const AdminDashboard = ({ match }) => {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(getUsersStart())
  }, [dispatch])
  // dispatch(getUsersStart())
  const currentUser = useSelector((state) => state.userReducer.currentUser)
  console.log(currentUser)
  let profile = false
  let manage = false
  let addReports = false
  let messages = false
  let reporters = false
  let iofficers = false
  let campaigns = false
  if (window.location.href.indexOf('reported-crimes') > -1) {
    manage = true
  } else if (window.location.href.indexOf('add-report') > -1) {
    addReports = true
  } else if (window.location.href.indexOf('messages') > -1) {
    messages = true
  } else if (window.location.href.indexOf('reporters') > -1) {
    reporters = true
  } else if (window.location.href.indexOf('investigation-officers') > -1) {
    iofficers = true
  } else if (window.location.href.indexOf('campaigns') > -1) {
    campaigns = true
  } else if (window.location.href.indexOf('dashboard') > -1) {
    profile = true
  }
  return (
    <div className={AdminDashboardCss.container}>
      <h1>
        Welcome :{' '}
        {currentUser.type === 'officer'
          ? 'Investigation Officer'
          : currentUser.type === 'sofficer'
          ? 'Senior Officer'
          : 'Reporter'}
      </h1>
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
          {currentUser.type === 'reporter' && (
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
          )}
          <li>
            <Link
              to={`${match.path}/reported-crimes`}
              style={
                manage
                  ? {
                      color: '#d82a4e',
                      borderBottom: '5px solid #d82a4e',
                    }
                  : null
              }
            >
              Reported Crimes
            </Link>
          </li>
          {currentUser.type === 'sofficer' && (
            <>
              <li>
                <Link
                  to={`${match.path}/reporters`}
                  style={
                    reporters
                      ? {
                          color: '#d82a4e',
                          borderBottom: '5px solid #d82a4e',
                        }
                      : null
                  }
                >
                  Reporters
                </Link>
              </li>
              <li>
                <Link
                  to={`${match.path}/investigation-officers`}
                  style={
                    iofficers
                      ? {
                          color: '#d82a4e',
                          borderBottom: '5px solid #d82a4e',
                        }
                      : null
                  }
                >
                  Investigation Officers
                </Link>
              </li>
              <li>
                <Link
                  to={`${match.path}/campaigns`}
                  style={
                    campaigns
                      ? {
                          color: '#d82a4e',
                          borderBottom: '5px solid #d82a4e',
                        }
                      : null
                  }
                >
                  Add Campaigns
                </Link>
              </li>
            </>
          )}
          {/* <li>
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
     </li> */}
        </ul>
      </nav>
      <Route exact path={`${match.path}`} component={DashboardProfile} />
      <Route exact path={`${match.path}/reported-crimes`} component={DataBox} />
      <Route exact path={`${match.path}/reporters`} component={UsersBox} />
      <Route exact path={`${match.path}/campaigns`} component={AddCampaigns} />
      <Route
        exact
        path={`${match.path}/investigation-officers`}
        component={UsersBox}
      />
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
