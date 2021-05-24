import * as React from 'react';
import { useContext, useRef } from 'react';
import { useHistory } from 'react-router';
import { register } from '../../context/AuthActions';
import { AuthContext } from '../../context/AuthContext';
import "./register.css";


export const Register = () => {
  
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();

  const username = useRef() as React.MutableRefObject<HTMLInputElement>;
  const email = useRef() as React.MutableRefObject<HTMLInputElement>;
  const password1 = useRef() as React.MutableRefObject<HTMLInputElement>;
  const password2 = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleRegister = () => {

    const usernameValue = username.current.value;
    const emailValue = email.current.value;

    const password1Value = password1.current.value;
    const password2Value = password2.current.value;

    if(usernameValue.length >= 3 && emailValue.indexOf('@') !== -1 && emailValue.length >= 6) {
      if(password1Value === password2Value) {
        register(usernameValue, emailValue, password1Value, dispatch!, () => history.push("/"));
      } else {
        password1.current.setCustomValidity("Passwörter müssen übereinstimmen");
      }
    } else {
      console.log("TODO: Snackbar: Benutzername oder E-Mail prüfen");
    }
  }

  return (
    <div className="register">
      <div className="register-wrapper">
          <div className="register-left">
              <h3 className="register-left-logo">FireSocial</h3>
              <span className="register-left-desc">The Social Network that doesn't track you</span>
          </div>
          <div className="register-right">
            <div className="register-right-box">
                <input type="text" ref={ username } placeholder="Username" required minLength={3} className="register-right-box-input" />
                <input type="text" ref={ email } placeholder="E-Mail" required className="register-right-box-input" />
                <input type="password1"  ref={ password1 } placeholder="Password" required minLength={6} className="register-right-box-input" />
                <input type="password2" ref={ password2 } placeholder="Retype Password" required minLength={6} className="register-right-box-input" />
                <button className="register-right-box-register" onClick={ () => handleRegister() }>Register</button>
                <button className="register-right-box-login" onClick={ () => history.push("/login") }>Login with an existing account</button>
            </div>
          </div>
      </div>
    </div>
  );
}
