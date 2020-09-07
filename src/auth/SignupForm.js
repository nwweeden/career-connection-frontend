import React, { useState } from "react";
import Alert from '../common/Alert'
import {useHistory} from "react-router-dom";

/**
 * Renders signup form
 * 
 * Routes --> SignupForm --> Alert
 * 
 * State
 * 
 * Props
 * -register: A function that handles the registering of the user.
 */
function SignupForm({register}) {
  const [formData, setFormData] = useState({
      username:"", 
      password:"", 
      firstName:"", 
      lastName:"", 
      email:""
    });
  const [errorMessage, setErrorMessage] = useState('')
  const history = useHistory();
  const { username, password, firstName, lastName, email } = formData;

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(formData => {
      return {
        ...formData,
        [name]: value
      }
    })
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await register(formData);
      history.push("/");
    }
    catch (err) {
      err.forEach(e => setErrorMessage(m => m+=e))
    }
  }

  return (
    <div className='SignupForm'>
      <h1>Sign up!</h1>
      <form onSubmit={handleSubmit}>
        
        <label htmlFor = 'username'>Username:</label>
        <input 
          name="username" 
          value = {username} 
          onChange={handleChange} />

        <label htmlFor = 'password'>Password:</label>
        <input 
          name="password"
          type="password" 
          value = {password} 
          onChange={handleChange} />
        
        <label htmlFor = 'firstName'>First Name:</label>
        <input 
          name="firstName" 
          value = {firstName}
          onChange={handleChange} />

        <label htmlFor = 'lastName'>Last Name:</label>
        <input 
          name="lastName" 
          value = {lastName} 
          onChange={handleChange} />

        <label htmlFor = 'email'>Email:</label>
        <input 
          name="email" 
          value = {email} 
          onChange={handleChange} />
        <button>Submit</button>
      </form>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  )
}


export default SignupForm;