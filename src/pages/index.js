import React from 'react'
import { navigate } from 'gatsby'

import Layout from '../components/layout'

import { setUser } from '../utils/auth'

class IndexPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let value = event.target.name;
    this.setState({[value]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();  
    const data = new FormData(event.target);

    fetch('http://localhost:5000/login' , {
      method: "POST",
      body: data,
      credentials: 'include',
    })
    .then(res => res.json())
    .then(response => {
      console.log(response)
      if (response.status !== 200) {
        throw(response)
      }
      setUser(response.user)
      navigate(`/page-2/`)
      return 
    })
    .catch(e => {
      navigate(`/err/`)
      return 
    })
  }

  render() {
    return (
      <Layout>
        <form onSubmit={this.handleSubmit}>
          <h1>Test</h1>
          <label htmlFor="">
          Username
          {` `}
          <input type="text" name="username" id="username" value={this.state.username} onChange={this.handleChange}/></label>
          <br/>
          <label htmlFor="">
          Password
          {` `}
          <input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange}/></label>
          <br/>
          <input type="submit" value="Submit"/>
        </form>
      </Layout>
    )
  }
}  


export default IndexPage
