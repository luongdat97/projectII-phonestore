import React, { useContext, createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import { useCookies } from 'react-cookie';

const authContext = createContext();

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [user, setUser] = useState(cookies.user);

  const signin = (user, cb) => { 
      setUser(user);
      setCookie('user', user, { path: '/' });
      cb();
  };

  const signout = cb => {
      setUser(null);
      removeCookie('user', { path: '/' });
      cb();
  };

  return {
    user,
    signin,
    signout
  };
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ role, children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          role.indexOf(auth.user.role.name) !== -1 ? children : "Bạn không có quyền truy cập trang web này!"
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export {useAuth, ProvideAuth, PrivateRoute }