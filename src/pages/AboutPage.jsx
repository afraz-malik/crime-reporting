import React, { useEffect } from 'react'
import SmallHeader from '../components/SmallHeader/SmallHeader'
import BecomeFaculty from '../components/BecomeFaculty/BecomeFaculty'
import Footer from '../components/Footer/Footer'
import About from '../components/About/ABout'

const AboutPage = () => {
 useEffect(() => {
  window.scrollTo(0, 0)
 }, [])

 return (
  <div>
   <SmallHeader bg='bg2' section={false} />
   <About />
   <BecomeFaculty />
   <Footer />
  </div>
 )
}

export default AboutPage
