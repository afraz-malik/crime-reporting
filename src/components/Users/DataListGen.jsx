import React, { useState } from 'react'
import EditBox from '../EditBox/EditBox'
import DataBoxCss from './DataBox.module.scss'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { deleteFaculty } from '../../redux/data/data.actions'
import ReactModal from 'react-modal'
// import { DeleteClientAction } from '../../redux/clients/clients.actions'
// import { DeleteUserAction } from '../../redux/users/users.actions'
// Components

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '60vh',
    width: '50vw',
  },
}
const DataListGen = ({ data, index }) => {
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const [editBox, setEditBox] = useState(false)
  const currentUser = useSelector((state) => state.userReducer.currentUser)

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
      <td>{data.displayName}</td>
      <td>{data.phone}</td>
      <td>{data.address}</td>
      <td>{data.phone}</td>

      {/* <td>
    <div className={DataBoxCss.actions}>
     <img alt='' src='images/edit.svg' onClick={() => toggleEditBox()} />
     <img alt='' src='images/delete.svg' onClick={() => manageDelete()} />
     {editBox ? (
      <EditBox toggleEditBox={toggleEditBox} data={data} index={index} />
     ) : null}
    </div>
   </td> */}
      <ReactModal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        style={customStyles}
      >
        <h1>Reporter Details</h1>
        <table className={DataBoxCss.table}>
          <tr>
            <th>Reporter Name</th>
            <th>Reporter Address</th>
            <th>Reporter Phone</th>
            <th>Reporter email</th>
          </tr>
          <tr>
            <td>{data.displayName}</td>
            <td>{data.address}</td>
            <td>{data.phone}</td>
            <td>{data.email}</td>
          </tr>
        </table>
      </ReactModal>
    </tr>
  )
}

export default DataListGen
