import './App.css'
import Contact from './components/Contact'
import Hero from './components/Hero'
import Overview from './components/Overview'
import Skills from './components/Skills'
import Testimonials from './components/Testimonials'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Timeline from './components/Timeline'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <Hero/>
      <Overview/>
      <Timeline/>
      <Skills/>
      <Testimonials/>
      <Contact/>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          background: "#000000",
          color: "#e5e7eb",
          borderRadius: "12px",
          boxShadow: "0 0 12px rgba(99, 102, 241, 0.6)",
          fontSize: "0.95rem",
        }}
      />
      <Footer/>
    </>
  )
}

export default App
