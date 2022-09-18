import { memo, VFC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { TopPage } from '../ui/pages/'
import { SchedulePage } from '../ui/pages/schedule'
import { LayoutPage } from '../ui/pages/layout'
import { ImageMapPage } from '../ui/pages/imageMap'
import { Zoom } from '../ui/pages/zoom'
import { ApiTestPage } from '../ui/pages/apiTest'


export const Routing: VFC = memo(() => (
  <Routes>
    <Route path="/" element={<TopPage />} />
    <Route path="/schedule" element={<SchedulePage />} />
    <Route path="/layout" element={<LayoutPage />} />
    <Route path="/image-map" element={<ImageMapPage />} />
    <Route path="/zoom" element={<Zoom />} />
    <Route path="/swr" element={<ApiTestPage />} />
  </Routes>
))
