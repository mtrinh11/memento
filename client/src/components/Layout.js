import '../styles/Layout.css'
import React from 'react'
import Nav from './Nav'

export default ({ children, authenticated, currentUser }) => (
  <div className='layout'>
    <Nav
      authenticated={authenticated}
      currentUser={currentUser}
      className="header-elevated"
    />
    <div style={{display:"flex", height: "100vh"}}>
      {children}
    </div>
    
  </div>
)
