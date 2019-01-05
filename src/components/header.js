import { Link, navigate } from 'gatsby'
import PropTypes from 'prop-types'
import  React from 'react'

import { getUser } from '../utils/auth'

const Header = ({ siteTitle }) => {
  if (getUser() === "no one") {    
    // navigate('/login/')
    return <div
    style={{
      // background: `rebeccapurple`,
      color: `#dadada`,
      marginBottom: `1.45rem`,
      padding: `1.45rem 1.0875rem`
    }}
  >
    <nav className="navbar">
      <Link
          to="/login/"
          activeStyle= {{          
            color: "orange"
          }}>
          Login
        </Link>
      </nav>    
    </div>
  }
  return <div
    style={{
      // background: `rebeccapurple`,
      color: `#dadada`,
      marginBottom: `1.45rem`,
      padding: `1.45rem 1.0875rem`
    }}
  >
    <nav className="navbar">
    <Link
        to="/"
        activeStyle= {{
          color: "orange"
        }}>
        Home
      </Link>   
      {` `}     
      <Link
        to="/dash/"
        activeStyle= {{
          color: "orange"
        }}>
        Notes
      </Link>      
      {` `}
      <Link
        to="/logout/"
        activeStyle= {{
          color: "orange"
        }}>
        Logout
      </Link>
    </nav>
  </div>
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: `David Crandall`,
}

export default Header
