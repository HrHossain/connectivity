import React, { useEffect } from 'react'
import UserProfileBoard from '../component/profile/UserProfileBoard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfile } from '../features/profile/profileSlice'

const ProfilePage = () => {
  const {user} = useSelector(state=>state.auth)
  const dispatch = useDispatch()

  useEffect(()=>{

    dispatch(fetchProfile(user?.id))

  },[])
  return (
    <UserProfileBoard/>
  )
}

export default ProfilePage