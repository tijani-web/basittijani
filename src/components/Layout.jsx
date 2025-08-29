import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <>
      <main>
        <div className="res-nav">
          <Header />
        </div>
        <div>{children}</div>
        <Footer />
      </main>
    </>
  )
}

export default Layout