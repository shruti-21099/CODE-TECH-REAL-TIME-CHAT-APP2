import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/auth'
import Chat from './pages/chat'
import Profile from './pages/profile'
import { useAppStore } from './store'
import { apiClient } from './lib/api-client'
import { GET_USER_INFO } from './utils/constants'



const App = () => {

  const {userInfo, setUserInfo} = useAppStore();
  const [loading, setLoading] = useState(true);

  const PrivateRoute = ({ children }) => {
    const { userInfo } = useAppStore();
    return userInfo ? children : <Navigate to="/auth" />;
  };
  
  const AuthRoute = ({ children }) => {
    const { userInfo } = useAppStore();
    return !userInfo ? children : <Navigate to="/chat" />;
  };

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      try{
        const response = await apiClient.get(GET_USER_INFO, {withCredentials:true})
        console.log({response});
        if(response.status===200 && response.data.id){
          setUserInfo(response.data);
        }
        else{
          setUserInfo(undefined);
        }
      }
      catch(err){
        console.log("Error while fetching user data: ", err)
        setUserInfo(undefined)
      }
      finally{
        setLoading(false);
      }
    }

    if(!userInfo){
      console.log("No User data found in store")
      getUserData();
    }
    else{
      setLoading(false);
    }
  }, [userInfo])

  if(loading){
    return (<div>Loading...</div>)
  }

  return (
    
      <Routes>
        <Route path="/auth" element={<AuthRoute><Auth/></AuthRoute>} />
        
        <Route path="/chat" element={<PrivateRoute><Chat/></PrivateRoute>} />

        <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
        
        
        <Route path='*' element={<Navigate to="/auth"/>} />
      </Routes>
  )
}

export default App