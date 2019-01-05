import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import './layout.css'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            color: `#dadada`,
            margin: `0 auto`,
            maxWidth: 1260,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          {children}
          <footer className="footer">
            © 2018, Built with <a href="https://www.gatsbyjs.org">Gatsby</a> 
            {` `}
            But let's be honest, <a href="https://dcrands.com">David Crandall</a>
            {` `}
            made it a bit cooler.
          </footer>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
