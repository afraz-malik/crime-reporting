import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import FacultyCardCss from './FacultyCard.module.scss'

const FacultyCard = ({ el }) => {
  console.log(el)
  return (
    <Link
      to={{
        pathname: `/news/${el.id}`,
        uid: el.id,
      }}
      className={FacultyCardCss.card}
    >
      <div
        className={FacultyCardCss.img}
        style={{
          backgroundImage: `url(https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg)`,
        }}
      ></div>
      <div className={FacultyCardCss.cardtext}>
        <div className={FacultyCardCss.details}>
          <h3>{el.personal?.fm_name}</h3>
          <h6>{el?.fm_designation}</h6>
          <p> Type: &nbsp; {el?.type}</p>
          <p>Details: &nbsp; {el?.details}</p>
          <p>Date: &nbsp; {el?.date}</p>
          <p>By: &nbsp; {el?.displayName}</p>
        </div>
      </div>
    </Link>
  )
}
export const CampaignCard = ({ el }) => {
  return (
    <Link
      to={{
        pathname: `/campaigns/${el.id}`,
        uid: el.id,
      }}
      className={FacultyCardCss.card}
    >
      <div
        className={FacultyCardCss.cardtext}
        style={{
          padding: '20px',
        }}
      >
        <h1>Campaign</h1>
        <div dangerouslySetInnerHTML={{ __html: el.state }}></div>
      </div>
    </Link>
  )
}
export default withRouter(FacultyCard)
