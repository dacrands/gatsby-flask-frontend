import React from 'react'
import { navigate } from 'gatsby'

import Layout from '../components/layout'
import { getUser } from '../utils/auth'

class IndexPage extends React.Component {
  constructor(props) {
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
    this.deleteLink = this.deleteLink.bind(this)
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
    fetch('http://localhost:5000/link', {
      method: "GET",
      credentials: 'include',
    })
      .then(res => res.json())
      .then(response => {        
        if (response.status !== 200) {
          throw (response)
        }
        this.setState({ links: response.links })        
        return
      })
      .catch(e => {
        navigate(`/err/`)
        return
      })
  }

  handleChange(event) {
    let value = event.target.name;
    this.setState({ [value]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch('http://localhost:5000/link', {
      method: "POST",
      body: data,
      credentials: 'include',
    })
      .then(res => res.json())
      .then(response => {
        if (response.status !== 200) {
          throw (response)
        }
        this.getLinks()
        this.setState({
          title: "",
          desc: "",
          url: "",
        })
        return
      })
      .catch(e => {
        navigate(`/err/`)
        return
      })
  }

  deleteLink(event) {
    fetch(`http://localhost:5000/link/delete/${event.target.value}`, {
      method: `POST`,
      credentials: `include`,
    })
      .then(res => res.json())
      .then(response => {
        if (response.status !== 200) {
          throw (response)
        }
        this.getLinks()
        return
      })
      .catch(e => {
        alert("Something went wrong!")
        return
      })
  }

  clock() {
    let currTime = new Date()
    this.setState({ time: currTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) })
  }

  render() {
    return (
      <Layout>
        <header className="header--index">
          <h1>Hello {getUser()}!</h1>
          <section className="clock">
            <h2>{this.state.time}</h2>
            <hr />
            <h2>{this.state.date}</h2>
          </section>
        </header>

        <section className="links__container">
          {/* ----------        
              FORM
          ------------*/}
          <form className="form" onSubmit={this.handleSubmit}>
            <label htmlFor="title">
              Title
              <br />
              <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
            </label>
            <label htmlFor="url">
              Url
              <br />
              <input type="url" name="url" value={this.state.url} onChange={this.handleChange} />
            </label>
            <label htmlFor="desc">
              Description
              <br />
              <textarea type="text" name="desc" cols="40" rows="3" value={this.state.desc} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>

          {/* ----------        
              LINKS
          ------------*/}
          <div className="links">
            {this.state.links.map(link => {
              return <div className="links__link">
                <div className="links__text">
                  <a target="_blank" href={link.url}>
                    <h3>{link.title}</h3>
                  </a>
                  <p>
                    <strong>{link.timestamp}</strong>
                  </p>
                  <p>{link.desc}</p>
                </div>
                <div>
                  <button onClick={this.deleteLink} value={link._id} className="btn btn--delete">Delete</button>
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
