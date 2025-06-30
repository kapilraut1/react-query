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


function App() {

  const queryClient = new QueryClient()
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
    
    <UserDashboard />
    {/* <ManageServices />
    <AddForm />
    <PlanList />
    <PlanDashboard /> */}
    </QueryClientProvider>
    </>
  )
}

export default App
