import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './components/Landing'
import ChatView from './components/ChatView'
import AreaPage from './components/AreaPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/chat" element={<ChatView />} />
        <Route path="/area/:slug" element={<AreaPage />} />
      </Routes>
    </BrowserRouter>
  )
}
