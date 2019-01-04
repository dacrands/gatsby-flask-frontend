import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'


const ErrPage = () => (
  <Layout>    
    <h1>Something went wrongs</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default ErrPage