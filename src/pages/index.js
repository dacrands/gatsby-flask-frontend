import React from 'react'
import { navigate } from 'gatsby'

import Layout from '../components/layout'
import { getUser } from '../utils/auth'

class IndexPage extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      time: "--:-- --",
      date: "--/--/--",
      clockInterval: null,
      title: "",
      desc: "",      
      url: "",
      links: []
    }

    this.clock = this.clock.bind(this)
    this.getLinks = this.getLinks.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    var clockInterval = setInterval(this.clock, 1000)
    this.setState({ clockInterval: clockInterval })
    let currDate = new Date()
    this.setState({ date: currDate.toLocaleDateString() })

    this.getLinks()
  }

  componentWillUnmount() {
    clearInterval(this.state.clockInterval)
  }

  getLinks() {
    fetch('http://localhost:5000/link' , {
      method: "GET",      
      credentials: 'include',
    })
    .then(res => res.json())
    .then(response => {   
      console.log(response.links[0])    
      if (response.status !== 200) {
        throw(response)
      }      
      this.setState({links: response.links})            
      // console.log(response.links)
      return 
    })
    .catch(e => {      
      navigate(`/err/`)
      return 
    })
  }

  clock() {
    let currTime = new Date()
    this.setState({ time: currTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) })
  }

  handleChange(event) {
    let value = event.target.name;
    this.setState({[value]: event.target.value});    
  }

  handleSubmit(event) {
    event.preventDefault();  
    const data = new FormData(event.target);
    fetch('http://localhost:5000/link' , {
      method: "POST",
      body: data,
      credentials: 'include',
    })
    .then(res => res.json())
    .then(response => {      
      if (response.status !== 200) {
        throw(response)
      }                  
      this.getLinks()
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
        <header className="header--index">
          <h1>Hello { getUser() }!</h1>
          <section className="clock">
            <h2>{this.state.time}</h2>
            <hr/>
            <h2>{this.state.date}</h2>
          </section>        
        </header>      

        <section className="links__container">
          <form className="form" onSubmit={this.handleSubmit}>
            <label htmlFor="">
              Title
              <br/>
              <input type="text" name="title" value={this.state.password} onChange={this.handleChange}/>
            </label>
            <label htmlFor="">
              Url
              <br/>
              <input type="url" name="url" value={this.state.password} onChange={this.handleChange}/>
            </label>
            <label htmlFor="">
              Description
              <br/>
              <textarea type="text" name="desc" value={this.state.password} onChange={this.handleChange}/>
            </label>
            <input type="submit" value="Submit"/>
          </form>

          <div className="links">
            {this.state.links.map(link => {
              return <div className="links__link">                              
                <div className="links__text">
                  <a target="_blank" href={link.url}>
                    <h3>{link.title}</h3>
                  </a>
                  <p>{link.timestamp}</p>
                  <p>{link.title}</p>
                </div>                          
                <div>
                  <button className="btn btn--delete">Delete</button>                      
                </div> 
              </div>
            })}
          </div>
        </section>  
      </Layout>
    )
  }
}  


export default IndexPage
