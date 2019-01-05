import React from 'react'
import { navigate } from 'gatsby'

import Layout from '../components/layout'

// import { getUser } from '../utils/auth'

class SecondPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text: '',
      posts: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.getPosts = this.getPosts.bind(this);
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    fetch('http://localhost:5000/post' , {
      method: "GET",      
      credentials: 'include',
    })
    .then(res => res.json())
    .then(response => {            
      if (response.status !== 200) {
        throw(response)
      }      
      this.setState({posts: response.posts})            
      return 
    })
    .catch(e => {      
      navigate(`/err/`)
      return 
    })
  }

  deletePost(event) {    
    fetch(`http://localhost:5000/post/delete/${event.target.value}` , {
      method: `POST`,      
      credentials: `include`,
    })
    .then(res => res.json())
    .then(response => {            
      if (response.status !== 200) {
        throw(response)
      }      
      this.getPosts()
      console.log('NICE')
      return 
    })
    .catch(e => {      
      // navigate(`/err/`)
      return 
    })
  }

  handleChange(event) {
    let value = event.target.name;
    this.setState({[value]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();  
    const data = new FormData(event.target);

    fetch('http://localhost:5000/post' , {
      method: "POST",
      body: data,
      credentials: 'include',
    })
    .then(res => res.json())
    .then(response => {            
      if (response.status !== 200) {
        throw(response)
      }
      this.setState({ text: "" })
      this.getPosts()
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
        <main className="dash">        
          <div className="form__container">
            <form className="form" onSubmit={this.handleSubmit}>        
              <label htmlFor="text">
              {/* <h2>Write something cool!</h2> */}

              <textarea 
                placeholder="You write stuff here."
                ref="text" 
                rows="15" 
                cols="40" 
                type="text" 
                name="text" 
                id="text" 

                value={this.state.text} onChange={this.handleChange}/>
              </label>
              <br/>
              <input type="submit" value="Submit"/>
            </form>
          </div>

          <div className="posts">
          {/* <h2>Showing {this.state.posts.length} posts</h2> */}
            <ul className="posts__list">
              {this.state.posts.map(post => (                   
                  <li className="post" key={post._id}>                    
                    <ul className="post__list">
                      <li>{post.timestamp}                    
                        <button 
                          className="btn btn--delete"
                          value={post._id} 
                          onClick={this.deletePost}>
                          Delete</button>
                      </li>
                      <li>{post.body}</li>
                    </ul>                
                  </li>                            
              ))}
            </ul>
          </div>
        </main>         
      </Layout>
    )
  }
}  


export default SecondPage
