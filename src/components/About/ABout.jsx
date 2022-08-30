import React from 'react'
import ContactCss from './Contact.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage } from '../../redux/data/data.actions'
import { Loading } from '../../redux/data/data.selectors'
import { Spinner } from '../spinner/spinner'
const About = () => {
 const dispatch = useDispatch()
 const loading = useSelector((s) => Loading(s))
 const [state, setstate] = React.useState({
  name: '',
  email: '',
  subject: '',
  message: '',
 })
 const handleChange = (event) => {
  setstate({ ...state, [event.target.name]: event.target.value })
 }
 const handleSubmit = (event) => {
  event.preventDefault()
  dispatch(sendMessage(state))
  setstate({ name: '', email: '', subject: '', message: '' })
 }
 return (
  <section className={ContactCss.section}>
   <div className={ContactCss.container} id='contact'>
    <div className={ContactCss.row}>
     <div className={ContactCss.col2}>
      <div className={ContactCss.contact_warp}>
       <div className={ContactCss.title}>
        <h2>About Us</h2>
        <p>
         CRIME REPORTING & INVESTIGATION (CRI) - FIA is a law enforcement agency
         dedicated to fight cyber crime. Inception of this Hi-Tech crime
         fighting unit transpired in 2022 to identify and curb the phenomenon of
         technological abuse in society CRIME REPORTING & INVESTIGATION (CRI),
         is the latest introduction to mandate of the FIA, primarily to deal
         with technology based crimes in Pakistan. It is the only unit of its
         kind in the country and in addition to the directly received complaints
         also assists other law enforcement agencies in their own cases. NR3C
         has expertise in Digital Forensics, Technical Investigation,
         Information System Security Audits, Penetration Testing and Trainings.
         The unit since its inception has been involved in capacity building of
         the officers of Police, Intelligence, Judiciary, Prosecutors and other
         Govt. organizations. NR3C has also conducted a large number of
         seminars, workshops and training/awareness programs for the academia,
         print/electronic media and lawyers. Cyber Scouts is the latest
         initiative of NR3C, in which, selected students of different
         private/public schools are trained to deal with computer emergencies
         and spreading awareness amongst their fellow students, teachers and
         parents.
        </p>
       </div>
       <div className={ContactCss.phone}>
        {/* <span>Our Mission</span> */}
        <h2>Our Mission</h2>
       </div>
       <ul className={ContactCss.contact}>
        <li>
         To achieve excellence by promoting culture of merit, enforcing
         technology based law, extending continuous professional training,
         ensuring effective internal accountability, encouraging use of
         technology and possessing an efficient feedback mechanism
        </li>
        <li>
         To achieve excellence by promoting culture of merit, enforcing
         technology based law, extending continuous professional training,
         ensuring effective internal accountability, encouraging use of
         technology and possessing an efficient feedback mechanism
        </li>
        <li>
         To achieve excellence by promoting culture of merit, enforcing
         technology based law, extending continuous professional training,
         ensuring effective internal accountability, encouraging use of
         technology and possessing an efficient feedback mechanism
        </li>
       </ul>
      </div>
     </div>
    </div>
   </div>
   {loading ? <Spinner /> : null}
  </section>
 )
}

export default About
