import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserDashboard from './components/UserDashboard'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AddUserForm from './components/AddForm'
import ManageServices from './components/ManageServices'
import AddForm from './components/AddPlan'
import PlanList from './components/PlanList'
import PlanDashboard from './components/PlanDashboard'
import { ToastContainer } from 'react-toastify'
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute'
import Admin from './pages/Admin'
import { BrowserRouter, Routes, Route } from "react-router";
function App() {

  const queryClient = new QueryClient()
  return (
    <>
    {/* <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
   
    </QueryClientProvider> */}
     <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
