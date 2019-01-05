import React from 'react'
import { navigate } from 'gatsby'

import Layout from '../components/layout'

import { getUser } from '../utils/auth'

class IndexPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      user: ""
    }
  }

  componentDidMount() {
    const user = getUser()
    console.log(user)
    // if ( user === {}) {
    //   return
    // }
    // this.setState({user: getUser()})
  }

  render() {
    return (
      <Layout>
        <h1>Hello { getUser() }!</h1>


      </Layout>
    )
  }
}  


export default IndexPage
