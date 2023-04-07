import React, { useState } from 'react'
import EditBox from '../EditBox/EditBox'
import DataBoxCss from './DataBox.module.scss'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { deleteFaculty } from '../../redux/data/data.actions'
import ReactModal from 'react-modal'
import {
  createNews,
  updateIO,
  updateProgress,
} from '../../firebase/firebase.config.js'
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
const DataListGen = ({ data, users }) => {
  const dispatch = useDispatch()
  const [showHistory, setShowHistory] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [editBox, setEditBox] = useState(false)
  const currentUser = useSelector((state) => state.userReducer.currentUser)
  console.log('thleo', users)
  const toggleEditBox = () => {
    setEditBox(!editBox)
  }
  const manageDelete = () => {
    const result = window.confirm('Are you sure you want to delete?')
    if (result) {
      dispatch(deleteFaculty(data.id))
    }
  }
  const handleChange = (e) => {
    console.log(data)
    updateIO({ id: data.id, io: e.target.value }).then((re) => {
      alert('Investigation officer assigned Successfully')
    })
  }
  const handleAdd = (e) => {
    console.log(e)
    updateProgress({
      id: data.id,
      progress: [
        ...(data.progress || []),
        { date: new Date().toISOString(), value: e },
      ],
    }).then((re) => {
      alert('Added Successfully')
    })
  }
  console.log(data)
  const createNew = (e) => {
    createNews({
      id: data.id,
      progress: [
        ...(data.progress || []),
        { date: new Date().toISOString(), value: e },
      ],
    }).then((re) => {
      alert('News Created Successfully')
    })
  }
  return (
    <tr>
      <td>{data.type}</td>
      <td>{data.date}</td>
      <td>{data.time}</td>
      <td>{data.details}</td>
      <td>{data.location}</td>
      <td>
        <a href={data.imgurl} target="_href">
          <i className="fa fa-download"></i>
        </a>
      </td>
      <td>
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => setShowHistory(true)}
        >
          {(Array.isArray(data.progress) && data?.progress[0]?.value) || '---'}
        </span>

        {currentUser.type === 'officer' && (
          <i
            className="fa fa-pencil"
            style={{ fontSize: '12px', marginLeft: '10px' }}
            onClick={() => setShowHistory(true)}
          ></i>
        )}
      </td>
      {currentUser.type === 'sofficer' && (
        <td>
          <select value={data.io} onChange={(e) => handleChange(e)}>
            <option>Not assigned</option>
            {users
              ?.filter((el) => el.type === 'officer')
              ?.map((el) => (
                <option value={el.id}>{el.displayName}</option>
              ))}
          </select>
        </td>
      )}
      {currentUser.type === 'sofficer' && (
        <td>
          <span
            style={{
              cursor: 'pointer',
            }}
            onClick={() => createNew()}
          >
            CREATE
          </span>
        </td>
      )}
      {currentUser.type === 'sofficer' && (
        <td>
          <span
            style={{
              cursor: 'pointer',
            }}
          >
            {data.io && data.io !== 'Not assigned'
              ? 'assigned to invegilator'
              : 'pending'}
          </span>
        </td>
      )}
      {currentUser.type === 'officer' && (
        <td>
          <i className="fa fa-eye" onClick={() => setOpenModal(true)}></i>
        </td>
      )}
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
        isOpen={showHistory}
        onRequestClose={() => setShowHistory(false)}
        style={customStyles}
      >
        <h1>Update History</h1>
        {currentUser.type === 'officer' && (
          <div>
            Add update:
            <input
              type="text"
              onKeyDown={(e) => {
                e.key === 'Enter' && handleAdd(e.target.value)
              }}
            />
          </div>
        )}
        <table className={DataBoxCss.table}>
          <tr>
            <th>Time</th>
            <th>Status</th>
          </tr>
          {console.log(data)}
          {data?.progress?.map((el) => (
            <tr>
              <td>{new Date(el.date || new Date())?.toISOString()}</td>
              <td>{el.value}</td>
            </tr>
          ))}
        </table>
      </ReactModal>
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
