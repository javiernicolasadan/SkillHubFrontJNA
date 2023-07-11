import React, { useContext, useEffect, useState } from 'react'
import { SessionContext } from '../contexts/SessionContext'
import axios from 'axios'
import { FaUserEdit } from 'react-icons/fa'

export default function ChangePic() {

    const [showWindow, setShowWindow] = useState(false)
    const [updatedUsername, setUpdatedUsername] = useState('')
    const [updatedEmail, setUpdatedEmail] = useState('')
    const [originImageUrl, setOriginImageUrl] = useState('')
    const {currentUser, setCurrentUser} = useContext(SessionContext)

    useEffect(()=>{
        setShowWindow(false)
        setUpdatedUsername(currentUser.username)
        setUpdatedEmail(currentUser.email)
        setOriginImageUrl(currentUser.imageUrl)
    }, [])

    const toggleWindow = () =>{
        setShowWindow(!showWindow)
    }

    const handleUpdate = async(e) =>{
        e.preventDefault()
        const fData = new FormData()
        const imageUrl = e.target.imageUrl.files[0]
        fData.append('userId', currentUser._id)
        fData.append('username', updatedUsername)
        fData.append('email', updatedEmail)
        if(imageUrl){
            fData.append('imageUrl', imageUrl)
        }else{
            fData.append('imageUrl', originImageUrl)
        }

        try {
            const response = await axios.put(`${import.meta.env.VITE_BASE_API_URL}/updateUser/${currentUser._id}`, fData)

            if(response.status === 200){
                setCurrentUser(response.data)
                setShowWindow(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
    <div>
        <button onClick={toggleWindow}><FaUserEdit className="updateIcon"/></button>
    </div>

    <div className={`popup ${showWindow ? 'showPop' : 'hidePop'}`}>
        <div>
        <button style={{ color: 'black', marginTop: '2rem' }} onClick={toggleWindow}>X</button>
        </div>
        <form encType="multipart/form-data" onSubmit={handleUpdate}>
            <div className='popupField'>
                <label className="form-label">Email: </label>
                <input className="form-control" name='email' value={updatedEmail} onChange={(e)=>setUpdatedEmail(e.target.value)}></input>
            </div>
            <div className='popupField'>
                <label className="form-label">Username: </label>
                <input className="form-control" name='username' value={updatedUsername} onChange={(e)=>setUpdatedUsername(e.target.value)}></input>
            </div>
            <div className='popupField'>
                <label className="form-label">Profile picture:</label>
                <input className="form-control" name='imageUrl' type='file' accept='image/jpg,image/png'></input>
            </div>

            <div className="submitDiv">
                <button type='submit' className="transButton">Update user</button>
            </div>
        
        </form>
    </div>
    </>
  )
}
