import React from 'react'
import { useSelector } from 'react-redux'

const useAxios = () => {
    const user = useSelector((state)=>state.auth)
  console.log(user)
}

export default useAxios