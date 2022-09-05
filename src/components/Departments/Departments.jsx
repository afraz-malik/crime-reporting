import React from 'react'
import { Link } from 'react-router-dom'
import DepartmentsCss from './Departments.module.scss'
const Departments = () => {
 const dept = [
  {
   name: 'Rape',
   member: '10',
   image:
    'https://dailytimes.com.pk/assets/uploads/2022/06/10/Murder-6-1-3-3.jpg',
   authorName: 'Afraz Malik',
   authorDesignation: 'Top Reporter',
   authorImage: '1.jpg',
  },
  {
   name: 'Harassments',
   member: '12',
   image:
    'https://media.istockphoto.com/photos/no-this-cant-be-happening-picture-id487729513?k=20&m=487729513&s=612x612&w=0&h=JzwJiQDkSvqtXMiOA2HWQ0288fTR0Xpe_zcgSSo6jdk=',
   authorName: 'Hassan',
   authorDesignation: 'Top Reporter',
   authorImage: '2.jpg',
  },
  {
   name: 'Robbery/Theft',
   member: '50',
   image:
    'https://img1.parentune.com/images/blogs/Chain-snatching----how-to-protect-your-child-and-yourself--1510965665.jpg',
   authorName: 'Iqra',
   authorDesignation: 'Top Reporter',
   authorImage: '3.jpg',
  },
  {
   name: 'False Imprisonment',
   member: '20',
   image:
    'https://www.pintas.com/wp-content/uploads/2020/12/sexual-assault-lawyer-mormon-church-sex-abuse-is-sexual-abuse-common-in-the-mormon-church.jpg',
   authorName: 'Neha',
   authorDesignation: 'Top Reporter',
   authorImage: '4.jpg',
  },
  {
   name: 'Cyber Crime',
   member: '6',
   image:
    'https://i0.wp.com/krazytech.com/wp-content/uploads/Cyber-Crime.jpg?fit=654%2C372&ssl=1',
   authorName: 'Maryam',
   authorDesignation: 'Top Reporter',
   authorImage: '5.jpg',
  },
  {
   name: 'defamation',
   member: '12',
   image:
    'https://vpnoverview.com/wp-content/uploads/what-is-identity-fraud-featured-image-big-800x400.png',
   authorName: 'Malik',
   authorDesignation: 'Top Reporter',
   authorImage: '6.jpg',
  },
 ]

 return (
  <div className={DepartmentsCss.container} id='faculty'>
   <div className={DepartmentsCss.title}>
    <h4>Our Top Crime Reports</h4>
    <p>
     The world fasteste crime reporting and investigation system. From here you
     can get the latest crime reporting and investigation in a quick touch.
    </p>
   </div>
   <div className={DepartmentsCss.cards}>
    {dept.map((el) => (
     <Link
      key={el.name}
      className={DepartmentsCss.card}
      to={{
       pathname: `/faculty`,
       department: el.name,
      }}
     >
      <div
       className={DepartmentsCss.img}
       style={{ backgroundImage: `url(${el.image})`, objectFit: 'contain' }}
      ></div>
      <div className={DepartmentsCss.cardtext}>
       <div className={DepartmentsCss.details}>
        <h6>{el.name}</h6>
        {/* <p>{el.des}</p> */}
        <span>{el.member} Reports</span>
       </div>
       <div className={DepartmentsCss.author}>
        <img src={`images/authors/${el.authorImage}`} alt='' />
        <h5>
         {el.authorName},&nbsp;
         <span>{el.authorDesignation}</span>
        </h5>
       </div>
      </div>
     </Link>
    ))}
   </div>
  </div>
 )
}

export default Departments
