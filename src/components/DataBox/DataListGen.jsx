import React, { useState } from 'react'
import EditBox from '../EditBox/EditBox'
import DataBoxCss from './DataBox.module.scss'

// Redux
import { useDispatch } from 'react-redux'
import { deleteFaculty } from '../../redux/data/data.actions'
// import { DeleteClientAction } from '../../redux/clients/clients.actions'
// import { DeleteUserAction } from '../../redux/users/users.actions'
// Components

const DataListGen = ({ data, index }) => {
 const dispatch = useDispatch()
 const [editBox, setEditBox] = useState(false)
 const toggleEditBox = () => {
  setEditBox(!editBox)
 }
 const manageDelete = () => {
  const result = window.confirm('Are you sure you want to delete?')
  if (result) {
   dispatch(deleteFaculty(data.id))
  }
 }
 console.log(data)
 return (
  <tr>
   <td>{data.type}</td>
   <td>{data.date}</td>
   <td>{data.time}</td>
   <td>{data.details}</td>
   <td>{data.location}</td>
   <td>
    <a href={data.imgurl} target='_href'>
     <i className='fa fa-download'></i>
    </a>
   </td>
   <td>
    <div className={DataBoxCss.actions}>
     <img alt='' src='images/edit.svg' onClick={() => toggleEditBox()} />
     <img alt='' src='images/delete.svg' onClick={() => manageDelete()} />
     {editBox ? (
      <EditBox toggleEditBox={toggleEditBox} data={data} index={index} />
     ) : null}
    </div>
   </td>
  </tr>
 )
}

export default DataListGen
