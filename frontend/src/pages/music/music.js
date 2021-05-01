import './music.css';
import { Component } from "react";


class Music extends Component {
  constructor() {
    super();
    this.state = {
      musicList: "Music List"
    }
  }
  getMusics = () => {
    const post = "Music List";
    this.setState({
      musicList: "Music List"
    });
  }

  render() {
    return (
      <div className="App">
        <div className="black-nav">
          개발 blog
        </div>
        <div className="list">
          <h3> { this.state.musicList } </h3>
          <p>2021.05.01</p>
          <hr/>
        </div>
      </div>
    );
  }
}


export default Music;
