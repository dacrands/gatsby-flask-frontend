import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'


const ErrPage = () => (
  <Layout>    
    <h1>Something went wrong!</h1>
    <p>Are you <Link to="/login">Logged in!</Link></p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default ErrPage