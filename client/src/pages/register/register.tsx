import * as React from 'react';
import "./register.css";

export interface IRegisterProps {
}

export const Register = (props: IRegisterProps) => {
  return (
    <div className="register">
      <div className="register-wrapper">
          <div className="register-left">
              <h3 className="register-left-logo">FireSocial</h3>
              <span className="register-left-desc">The Social Network that doesn't track you</span>
          </div>
          <div className="register-right">
            <div className="register-right-box">
                <input type="text" placeholder="Username" className="register-right-box-input" />
                <input type="text" placeholder="E-Mail" className="register-right-box-input" />
                <input type="password1" placeholder="Password" className="register-right-box-input" />
                <input type="password2" placeholder="Retype Password" className="register-right-box-input" />
                <button className="register-right-box-register">Register</button>
                <button className="register-right-box-login">Login with an existing account</button>
            </div>
          </div>
      </div>
    </div>
  );
}
