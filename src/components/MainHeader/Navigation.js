import React ,{useContext}from 'react';
import IsAuthenticated from '../../store/user-state';

import classes from './Navigation.module.css';

const Navigation = (props) => {
  const ctx=useContext(IsAuthenticated)
  return (
     

          <nav className={classes.nav}>
          <ul>
            {ctx.isLogin && (
              <li>
                <a href="/">Users</a>
              </li>
            )}
            {ctx.isLogin && (
              <li>
                <a href="/">Admin</a>
              </li>
            )}
            {ctx.isLogin && (
              <li>
                <button onClick={ctx.onLogout}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
            );

 
};

export default Navigation;
