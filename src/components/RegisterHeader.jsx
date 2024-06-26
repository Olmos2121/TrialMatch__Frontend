import React from 'react'
import '../styles/RegisterHeader.css'
import { NavLink } from 'react-router-dom'

export const RegisterHeader = () => {
  return (
    <>
      <header className="registerHeader">
        <NavLink to="/">
          <h2>TrialMatch</h2>
        </NavLink>
      </header>
    </>
  )
}
