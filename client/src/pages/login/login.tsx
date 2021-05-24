import { useContext, useRef, useState, useEffect, MutableRefObject } from 'react';
import "./login.css";
import { useHistory } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext';
import { login } from "../../context/AuthActions";
import { CircularProgress, Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const Login = () => {

  const usernameOrEmail = useRef() as MutableRefObject<HTMLInputElement>;
  const password = useRef() as MutableRefObject<HTMLInputElement>;

  const history = useHistory();
  const { isFetching, error, dispatch } = useContext(AuthContext); 

  const [ loginButtonActive, setLoginButtonActive ] = useState(false);
  const [open, setOpen] = useState(false);

  const handleLogin = (e: any) => {
    e.preventDefault();
    login(usernameOrEmail.current.value, password.current.value, dispatch!, () => history.push("/"));
  }

  useEffect(() => {
    if(error) {
      setOpen(true);
    }
  }, [error]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const validateUserinput = () => setLoginButtonActive(usernameOrEmail.current.value.length >= 3 && password.current.value.length >= 6);
  

  return (
    <div className="login">
      <div className="login-wrapper">
          <div className="login-left">
              <h3 className="login-left-logo">FireSocial</h3>
              <span className="login-left-desc">Das soziale Netzwerk welches deine Privatsphäre respektiert</span>
          </div>
          <div className="login-right">
            <div className="login-right-box">
              <form className="login-right-box-form" >
                <input type="text" ref={ usernameOrEmail } onChange={ () => validateUserinput() } placeholder="Benutzername oder E-Mail Adresse" minLength={3} required className="login-right-box-input" />
                <input type="password" onChange={ () => validateUserinput() } minLength={6} ref={ password } placeholder="Passwort" required className="login-right-box-input" />
                <button onClick={(e) => handleLogin(e)} className="login-right-box-login" disabled={ !loginButtonActive }>
                  { isFetching ? <CircularProgress style={{ marginTop: "5px" }} color="secondary" size="28px" /> : "Anmelden" }
                </button>
              </form>
                <span className="login-right-box-reset">Passwort zurücksetzen</span>
                <button onClick={ () => history.push("/register") } className="login-right-box-register">Erstelle neuen Account</button>
            </div>
          </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={ handleClose }>
        <Alert onClose={handleClose} severity="error">
          { error?.key === "login.incorrect" ? "Benutzername oder Password falsch" : error?.message }
        </Alert>
      </Snackbar>
    </div>
  );
}
