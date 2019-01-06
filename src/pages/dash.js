import React from 'react'
import { navigate } from 'gatsby'

import Layout from '../components/layout'

class SecondPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text: '',
      posts: [],
      showEdit: false,
      currPostId: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.editPost = this.deletePost.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.deletePost = this.deletePost.bind(this);    
    this.scrollRight = this.scrollRight.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);    
  }

  componentDidMount() {
    this.getPosts();
  }

  scrollRight() {    
    this.refs.postsList.scrollBy({
      left: 405,
      behavior: 'smooth'
    });
  }

  scrollLeft() {    
    this.refs.postsList.scrollBy({
      left: -405,
      behavior: 'smooth'
    });
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
      return 
    })
    .catch(e => {      
      alert("Something went wrong!")
      return 
    })
  }

  handleChange(event) {
    let value = event.target.name;
    this.setState({[value]: event.target.value});
  }

  // --------
  //  EDIT
  // --------
  editPost(event) {    
    let postText = this.refs[`body${event.target.value}`].innerHTML
    this.setState({ 
      text: postText,
      showEdit: true,
      currPostId: event.target.value
    })
  }

  cancelEdit() {
    this.setState({
      text: '',
      showEdit: false
    })
  }

  handleEditSubmit(event) {
    event.preventDefault();  
    const data = new FormData(event.target);

    fetch(`http://localhost:5000/post/edit/${this.state.currPostId}` , {
      method: `POST`,   
      body: data,
      credentials: `include`,
    })
    .then(res => res.json())
    .then(response => {            
      if (response.status !== 200) {
        throw(response)
      }      
      this.setState({ 
        text: "",
        showEdit: false,
      })
      this.getPosts()      
      return 
    })
    .catch(e => {      
      alert("Something went wrong!")
      return 
    })
  }

  // --------
  //  SUBMIT 
  // --------
  handleSubmit(event) {
    event.preventDefault();  
    const data = new FormData(event.target);

    fetch('http://localhost:5000/post' , {
      method: 'POST',
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
          {/* ----------        
              FORM
          ------------*/}
          <div className="form__container">
            <form className="form form--post" onSubmit={!this.state.showEdit ? this.handleSubmit : this.handleEditSubmit}>        
              <label htmlFor="text">              
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
              {
                !this.state.showEdit
                ? <input type="submit" value="Submit"/>
                : <div>
                  <input type="submit" className="warning" value="Submit Edit"/>
                  {` `}
                  <button onClick={this.cancelEdit} className="btn btn--warning">Cancel</button>
                </div>                
              }                            
            </form>
          </div>

          {/* ----------        
              POST
          ------------*/}
          <div className="posts">
            <div className="posts__title">
              <button onClick={this.scrollLeft}>	&#10134;</button>
              <h2>Showing {this.state.posts.length} posts</h2>
              <button onClick={this.scrollRight}>		&#10133;</button>
            </div>          
            <ul ref="postsList" className="posts__list">
              {this.state.posts.map(post => (                   
                  <li className="post" key={post._id}>                    
                    <ul className="post__list">
                      <li>{post.timestamp}                    
                        <div className="post__btns">
                          <button 
                            className="btn btn--warning"
                            value={post._id}                           
                            onClick={this.editPost}>                            
                            Edit
                          </button>
                          {` `}
                          <button 
                            className="btn btn--delete"
                            value={post._id} 
                            onClick={this.deletePost}>
                            Delete
                          </button>
                        </div>                        
                      </li>
                      <li ref={`body${post._id}`}>{post.body}</li>
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
