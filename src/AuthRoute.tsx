import React from 'react';
import { isUserAuthenticated } from './services/authService';
import { Route, Redirect } from 'react-router';
function AuthRoute (props: any) {
    const { component: Component, path, ...rest } = props;
    if(isUserAuthenticated()) {
        return (
            <Route path={path} {...rest} render={(routeProps) =>  <Component {...rest} {...routeProps}/>}/>
        )
    } else {
        return <Redirect to="/landing" />
    }
}

export default AuthRoute;