import './music.css';
import { Component } from "react";


class Music extends Component {
  constructor() {
    super();
    this.state = {
      musicList: "Music List",
      data: ""
    }
  }

  // TODO: get data from backend server and render page with them
  getData = () => {
    fetch(`http://ec2-3-34-0-45.ap-northeast-2.compute.amazonaws.com:3000/songs`, {
      method: "GET"
    }).then((res)=>console.log(res.json()));
  };

  render() {
    return (
      <div className="App">
        <div className="black-nav">
          {  }
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
