import { memo, VFC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { TopPage } from '../ui/pages/'
import { SchedulePage } from '../ui/pages/schedule'
import { LayoutPage } from '../ui/pages/layout'

export const Routing: VFC = memo(() => (
  <Routes>
    <Route path="/" element={<TopPage />} />
    <Route path="/schedule" element={<SchedulePage />} />
    <Route path="/layout" element={<LayoutPage />} />
  </Routes>
))
