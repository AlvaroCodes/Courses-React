import React from 'react'
import '../style/Spinner.css'

// https://tobiasahlin.com/spinkit/

const Spinner = () => {
  return (
    <div className="sk-chase">
    <div className="sk-chase-dot"></div>
    <div className="sk-chase-dot"></div>
    <div className="sk-chase-dot"></div>
    <div className="sk-chase-dot"></div>
    <div className="sk-chase-dot"></div>
    <div className="sk-chase-dot"></div>
  </div>
  )
}

export default Spinner