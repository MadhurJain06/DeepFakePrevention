import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Results from './pages/Results'
import { useLocation } from 'react-router-dom'

export default function App() {
  const location = useLocation()
  const isResults = location.pathname === '/results'

  return (
    <>
      {!isResults && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
