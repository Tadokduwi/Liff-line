"use client"

import React, { useState, useEffect } from 'react'
import liff from '@line/liff'
import axios from 'axios'

interface Profile {
  displayName: string;
  userId: string;
  pictureUrl: string;
}

const Header = () => {

  const [profileData, setProfileData] = useState({});
  const [message, setMessage] = useState('');

  let userId = ''

  const getData = async () => {
    await liff.init({ liffId: "2004854657-MGolEVgV" })
    if (!liff.isLoggedIn()) {


      liff.login()
      return false
    }
    const profile = await liff.getProfile();
    console.log('Login success', profile)
    setProfileData(profile)
  }

  // const login = async () => {
  //   liff.login()
  // }

  const logout = async () => {
    liff.logout()
    window.location.reload()
  }

  useEffect(() => {
    getData()
  }, []);



  function hasProfileData(data: any): data is Profile {
    return data !== null && data !== undefined;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {

      const data = {
        userUid: userId,
        message: message
      };
      console.log("data", data);
      const response = await axios.post('http://localhost:3030/send-message', data)
      console.log("response", response.data);

    } catch (error) {
      console.log("error", error);

    }
  }



  return (
    <div>
      {hasProfileData(profileData) && ( // Check if displayName exists
        <>
          <div className='flex justify-center items-center'>
            <img src={profileData?.pictureUrl} alt="Profile Image" className='w-40 p-5 rounded-full' />
          </div>
          <div className='text-center'>
            <h1>Welcome, {profileData.displayName}</h1>
            <p>UID: {profileData.userId}</p>
          </div>

        </>
      )}
      <div className='flex justify-center items-center'>
        {/* <button onClick={login} className='text-green-500 m-5'>Login with LINE</button> */}
        <button onClick={logout} className='text-red-500'>Logout</button>
      </div>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900"
        type="text"
        id='lineMessage'
        name="lineMessage"
        placeholder="Enter message"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSubmit}>Send message</button>
      <div>
      </div>
    </div>
  )
}

export default Header









