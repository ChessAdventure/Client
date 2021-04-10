import React, {MouseEvent} from 'react'
import {Link} from 'react-router-dom'

const Splash = () => {

  return (
    <>
      <h1>Welcome to Chess Quest</h1>
      <Link to={'/dashboard/1234'}>Enter Site</Link>
    </>
  )
}



export default Splash;