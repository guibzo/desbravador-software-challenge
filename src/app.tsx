import { Route, Routes, useParams } from 'react-router-dom'

import { Home } from '@/pages/home'
import { Repository } from '@/pages/repository'

const UserRoute = () => {
  const { username = '' } = useParams()

  return <Home initialUsername={username} />
}

const RepositoryRoute = () => {
  const { owner = '', repository = '' } = useParams()

  return <Repository owner={owner} repository={repository} />
}

export const App = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/users/:username' element={<UserRoute />} />
    <Route path='/repos/:owner/:repository' element={<RepositoryRoute />} />
    <Route path='*' element={<Home />} />
  </Routes>
)
