import React, { useContext, useEffect, useState } from 'react'
import { SessionContext } from '../contexts/SessionContext'

export default function ChangePic() {

    const [showWindow, setShowWindow] = useState(false)
    const [updatedUsername, setUpdatedUsername] = useState('')
    const [updatedImageUrl, setUpdatedImageUrl] = useState('')
    const {currentUser} = useContext(SessionContext)

    useEffect(()=>{
        setShowWindow(false)
    }, [])
    
    const toggleWindow = () =>{
        setShowWindow(!showWindow)
    }

    const handleUpdate = () =>{
        console.log()
    }

    useEffect(()=>{
        console.log(showWindow)
    }, [showWindow])


  return (
    <>
    <div>
        <button onClick={toggleWindow}>Update picture</button>
    </div>

    <div className={`popup ${showWindow ? 'showPop' : 'hidePop'}`}>
        <form onSubmit={handleUpdate}>
            <div>
                <label>Username: </label>
                <input name='username' value={currentUser.username}></input>
            </div>
            <div>
                <label>Profile picture:</label>
                <input name='imageUrl' type='file' accept='image/jpg,image/png'></input>
            </div>

            <div>
                <button type='submit'>Change</button>
            </div>
        
        </form>
    </div>
    </>
  )
}
