import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthScreen } from '@/features/auth/AuthScreen'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
