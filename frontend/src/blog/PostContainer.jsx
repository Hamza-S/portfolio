import React, { Component } from "react";
import axios from "axios";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

class PostContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }

  fetchPosts() {
    axios
      .get("http://localhost:9000/get_posts")
      .then((res) => res.data)
      .then((res) => this.setState({ posts: res }));
  }

  componentDidMount() {
    this.fetchPosts();
  }

  processPosts() {
    let titles = this.state.posts
      .slice(0)
      .reverse()
      .map(function (posts) {
        return [
          <div className="row align-items-left" id="post">
            <h1 id="postTitle"> {posts.title}</h1>
            <h2 id="postDate">{posts.date}</h2>
            <div id="postContent">{ReactHtmlParser(posts.body)}</div>
          </div>,
        ];
      });
    return titles;
  }

  render() {
    if (!this.state.posts) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container" id="postContainer">
          <div className="row align-items-center" id="blogfirstRow">
            <h1 id="title">
              <b>Hamza's Blog</b>
            </h1>
            <h5 id="aboutmeBlog">ABOUT ME</h5>
            <p id="intro">
              Welcome to my blog! My name is Hamza I am an undergraduate student
              at York University studying Computer Science. This blog consists
              of posts ranging from world issues, television shows, movies,
              software development, or really anything on my mind that I want to
              talk about.
            </p>
            <h5 id="aboutmeBlog">ENTRIES</h5>
          </div>

          {this.processPosts()}
        </div>
      );
    }
  }
}

export default PostContainer;
