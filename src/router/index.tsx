import { memo, VFC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { TopPage } from '../ui/pages/'

export const Routing: VFC = memo(() => (
  <Routes>
    <Route path="/" element={<TopPage />} />
  </Routes>
))
