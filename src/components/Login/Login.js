import React, { useState, useEffect ,useReducer, useRef} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
const emailReducer=(state,action)=>
{
if(action.type==='SET_EMAIL')
{
  return {value:action.val,isValid:action.val.includes('@')}
}
if(action.type==='SET_ISVALID')
{
 console.log(state.isValid)
  return {value:state.value , isValid:state.value.includes('@')}
}

}
const passwordReducer=(state,action)=>
{
if(action.type==='SET_PSWD')
{
 return {value:action.val ,isValid:action.val.trim().length>7 }
}
if(action.type==='SET_ISVALID')
{
  return {value:state.value,isValid:state.value.trim().length>7}
}
}
const Login = (props) => {

  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState,emailDispath]=useReducer(emailReducer,{value:'',isValid:null});
  const [passwordState,passwordDispatcher]=useReducer(passwordReducer,{value:'' ,isValid:null});

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        emailState.isValid && passwordState.isValid
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (event) => {
    emailDispath({type:'SET_EMAIL' , val:event.target.value});

    // setFormIsValid(
    //   emailState.isValid && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    passwordDispatcher({type:'SET_PSWD',val:event.target.value});
    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    emailDispath({type:'SET_ISVALID'})
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    passwordDispatcher({type:'SET_ISVALID'});
  };
  const emailRef=useRef();
  const passwordRef=useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    if(emailState.isValid && passwordState.isValid)
    {
      props.onLogin(emailState.value, passwordState.value);
    }
    else if(!emailState.isValid)
    {
     emailRef.current.activate();
    }
    else
    {
      passwordRef.current.activate();
    }
   
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input  value={emailState.value}
          ref={emailRef}
          type="email"
          id="email"
          label="E-Mail"
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          isValid={emailState.isValid}>
        </Input>
        
        <Input  value={passwordState.value}
          ref={passwordRef}
          type="password"
          id="password"
          label="Password"
          onChange={passwordChangeHandler}
          onBlur={validateEmailHandler}
          isValid={passwordState.isValid}>
        </Input>


        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
