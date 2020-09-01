import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from './JobList'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import ProfileForm from './ProfileForm'

/**
 * App --> {Navigation, Routes} -->
 * route / --> {Homepage}
 * route /companies --> CompanyList
 * route /companies/:handle --> CompanyDetail
 * route /jobs --> JobList
 * route /login --> LoginForm
 * route /signup --> SignupForm
 * route /profile --> ProfileForm
 * 
 * State
 * 
 * Props
 * 
 */
function Routes() {

  return (
    <div className='Routes'>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/companies">
            <CompanyList />
          </Route>
          <Route exact path="/companies/:handle">
            <CompanyDetail />
          </Route>
          <Route exact path="/jobs">
            <JobList />
          </Route>
          <Route exact path="/login">
            <LoginForm />
          </Route>
          <Route exact path="/signup">
            <SignupForm />
          </Route>
          <Route exact path="/profile">
            <ProfileForm />
          </Route>
        </Switch>
    </div>
  )

}


export default Routes;