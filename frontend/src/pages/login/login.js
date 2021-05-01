import './login.css';
import { Component } from "react";


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      checkForm: false,
      loginError: false
    };
  }
  render() {
    return (
      <header className="login-form">
        <h1>Welcome</h1>
        <form action="">
            <div className="int-area">
                <input type="text" name="id" id="id" autocapitalize="off" required />
                <label for="id">USERNAME</label>
            </div>
            <div className="int-area">
                <input type="password" name="pw" id="pw" autocapitalize="off" required />
                <label for="pw">PASSWORD</label>
            </div>
            <div className="btn-area">
                <button type="submit">LOGIN</button>
            </div>
        </form>
        <div className="caption">
            <a href="">Forgot password?</a>
        </div>
      </header>
    )
  }
}

export default Login;
