
import React from "react";
// import GreetingContainer from "./greeting/greeting_container";
import SignUpFormContainer from './splash/signup_form_container';
import LogInFormContainer from './splash/login_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Welcome from "./splash/welcome";
import MainContainer from "./main/main_container";


// import { logout } from '../../actions/session_actions';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
class App extends React.Component{
    constructor(props){
        super(props)
    }
    

    render(){
        return(
    <div>
        <AuthRoute exact path="/" component={Welcome} />
        <AuthRoute path="/login" component={LogInFormContainer} />
        <AuthRoute path="/signup" component={SignUpFormContainer} />
        <ProtectedRoute path="/" component={MainContainer} />
    
    
    </div>
        )
    }
}


       
export default App