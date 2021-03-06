import React, { Component } from "react";
import axios from "axios";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import { animateScroll as scroll, Link, Element } from "react-scroll";

class PostContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }

  fetchPosts() {
    axios
      .get("https://hamzasaleem.ca/get_posts")
      .then((res) => res.data)
      .then((res) => this.setState({ posts: res }));
  }

  componentDidMount() {
    this.fetchPosts();
  }

  processIndex() {
    let indices = this.state.posts
      .slice(0)
      .reverse()
      .map(function (posts) {
        return [
          <tr>
            <Link duration={300} smooth={true} offset={-50} to={posts.title}>
              <td className="index">
                {posts.date} - {posts.title}
              </td>
            </Link>
          </tr>,
        ];
      });
    return indices;
  }
  processPosts() {
    let titles = this.state.posts
      .slice(0)
      .reverse()
      .map(function (posts) {
        return [
          <Element name={posts.title}>
            <div className="row align-items-left" class="post">
              <h1 id="postTitle"> {posts.title}</h1>
              <h2 id="postDate">{posts.date}</h2>
              <div id="postContent">{ReactHtmlParser(posts.body)}</div>
            </div>
          </Element>,
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
          {this.processPosts()}
          <div id="blogFooter">
            <a id="toTop" onClick={() => scroll.scrollToTop()}>
              Go to top
            </a>
            <h7>By Hamza Saleem</h7>
          </div>
        </div>
      );
    }
  }
}

export default PostContainer;
