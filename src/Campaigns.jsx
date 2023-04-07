import React, { useEffect, useState } from 'react'
import SmallHeader from './components/SmallHeader/SmallHeader.jsx'
import BecomeFaculty from './components/BecomeFaculty/BecomeFaculty.jsx'
import Footer from './components/Footer/Footer.jsx'
import { fetchingCampaigns } from './firebase/firebase.config.js'
import { CampaignCard } from './components/FacultyCard/FacultyCard.jsx'
import FacultyProfileCss from './components/FacultyProfile/FacultyProfile.module.scss'
import { Link, useLocation } from 'react-router-dom'

const Campaigns = () => {
  return (
    <div>
      <SmallHeader bg="bg2" section={false} />
      <Data />
      <BecomeFaculty />
      <Footer />
    </div>
  )
}
export const SingleCampaign = (props) => {
  const location = useLocation()
  console.log(props)
  const [f, setState] = useState({})
  useEffect(() => {
    getCampaigns()

    return () => {}
  }, [])
  const getCampaigns = async () => {
    fetchingCampaigns().then((el) =>
      setState(el.filter((tt) => tt.id === props.location.uid)[0])
    )
  }
  console.log(f)
  return (
    <div>
      <SmallHeader bg="bg2" section={false} />
      <div className={FacultyProfileCss.container}>
        <div
          className={`${FacultyProfileCss.head}`}
          style={
            false
              ? {
                  position: 'fixed',
                  top: 0,
                  boxShadow: '0 2px 5px 0 rgb(0 0 0 / 16%)',
                }
              : { position: 'unset', boxShadow: 'unset' }
          }
        >
          {'Campaign'}
        </div>

        <div
          className={FacultyProfileCss.section}
          style={false ? { marginTop: '150px' } : null}
        >
          <div className={FacultyProfileCss.right}>
            <div
              className={FacultyProfileCss.header}
              dangerouslySetInnerHTML={{ __html: f.state }}
            ></div>
          </div>
        </div>
      </div>
      <BecomeFaculty />
      <Footer />
    </div>
  )
}

const Data = () => {
  const [state, setState] = useState([])
  useEffect(() => {
    getCampaigns()

    return () => {}
  }, [])
  const getCampaigns = async () => {
    fetchingCampaigns().then((el) => setState(el))
  }
  console.log(state)
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '30px',
        padding: '10px',
      }}
    >
      {state.map((el) => (
        <CampaignCard el={el} />
      ))}
    </div>
  )
}

export default Campaigns
