import './App.css'
import { Link,Routes,Route } from 'react-router-dom'
import HomePage from './components/HomePage.jsx'
import AboutPage from './components/AboutPage.jsx'
import EventsPage from './components/EventsPage.jsx'

function App() {
  return (
    <>
    <nav className='bg-gray-800 text-yellow-500 p-4'>
      <Link to="/">Home</Link>
      -
      <Link to="/about">About</Link>
      -
      <Link to="/events">Events</Link>
    </nav>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/events" element={<EventsPage />} />
    </Routes>
    </>
  )
}

export default App
