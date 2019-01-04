import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle }) => (
  <div
    style={{
      // background: `rebeccapurple`,
      marginBottom: `1.45rem`,
      padding: `1.45rem 1.0875rem`
    }}
  >
    <nav>
      <a href="http://localhost:5000/logout">Logout</a>        
    </nav>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
