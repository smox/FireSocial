import * as React from 'react';
import "./login.css";

export interface ILoginProps {
}

export const Login = (props: ILoginProps) => {
  return (
    <div className="login">
      <div className="login-wrapper">
          <div className="login-left">
              <h3 className="login-left-logo">FireSocial</h3>
              <span className="login-left-desc">The Social Network that doesn't track you</span>
          </div>
          <div className="login-right">
            <div className="login-right-box">
                <input type="text" placeholder="Username or E-Mail" className="login-right-box-input" />
                <input type="text" placeholder="Password" className="login-right-box-input" />
                <input type="password" className="login-right-box-input" />
                <button className="login-right-box-login">Log In</button>
                <span className="login-right-box-reset">Reset password</span>
                <button className="login-right-box-register">Create a new account</button>
            </div>
          </div>
      </div>
    </div>
  );
}
