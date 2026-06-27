import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { api } from '../api'
import axios from 'axios'
import { tokenUpdate } from '../features/auth/authSlice'

const useAxiosSecure = () => {
  const {token:authToken} = useSelector(state=>state.auth)
  const dispatch = useDispatch()
  const {token,refreshToken} = authToken

  const tokenRef = useRef(token)
  const refreshTokenRef = useRef(refreshToken)

  useEffect(()=>{
    tokenRef.current = token
    refreshTokenRef.current = refreshToken
  },[token,refreshToken])

  useEffect(()=>{
    // request interceptor
    const requestInterceptor = api.interceptors.request.use(config =>{
      if(tokenRef.current){
        config.headers.Authorization = `Bearer ${tokenRef.current}`
      }
      return config
    }, error => Promise.reject(error)
  )

  // response interceptor
  const responseIntercentor = api.interceptors.response.use(response => response, async (error)=>{
    const originalRequest = error.config
    // network error হলে (response নেই) সরাসরি reject
    if(!error.response){

      return Promise.reject(error)
    }
    if(error.response.status === 401 && !originalRequest._retry){
      originalRequest._retry = true
      try{
        const res = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,{refreshToken:refreshTokenRef.current})
        const {token:newToken} = res.data
        console.log(`newToken:${newToken}`)
        dispatch(tokenUpdate(newToken))
        tokenRef.current = newToken
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return api(originalRequest)
      }catch(refreshError){

        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }) 

  return ()=>{
    api.interceptors.request.eject(requestInterceptor)
    api.interceptors.response.eject(responseIntercentor)
  }
  },[dispatch])

  return {api}
}

export default useAxiosSecure