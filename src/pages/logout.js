import React from 'react'
import { Link } from 'gatsby'
import { logout } from '../utils/auth'

import Layout from '../components/layout'

class Logout extends React.Component {
    componentDidMount() {
        fetch(`http://localhost:5000/logout` , {      
          credentials: `include`,
        })
        .then(res => res.json())
        .then(response => {            
          if (response.status !== 200) {
            throw(response)
          }      
          logout()       
          return 
        })
        .catch(e => {              
          alert("Something went wrong!")
          return 
        })
      }
    
  
    render() {
      return (
        <div className="box">
            <h1>You have logged out!</h1>
            <p><Link to="/login/">Click here</Link> to log back in.</p>            
        </div>
      )
    }
  }  
  
  
  export default Logout