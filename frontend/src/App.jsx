import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserDashboard from './components/UserDashboard'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AddUserForm from './components/AddForm'
import ManageServices from './components/ManageServices'
import AddPlan from './components/AddPlan'
import PlanList from './components/PlanList'
import PlanDashboard from './components/PlanDashboard'

function App() {
  const [count, setCount] = useState(0)
  const queryClient = new QueryClient()
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <AddUserForm />
    <UserDashboard />
    <ManageServices />
    <AddPlan />
    <PlanList />
    <PlanDashboard />
    </QueryClientProvider>
    </>
  )
}

export default App
