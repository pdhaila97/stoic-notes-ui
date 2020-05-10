import React from 'react';
import { isUserAuthenticated } from './services/authService';
import { Route, Redirect } from 'react-router';
function PublicRoute (props: any) {
    const { component: Component, path, ...rest } = props;
    if(!isUserAuthenticated()) {
        return (
            <Route path={path} {...rest} render={(routeProps) =>  <Component {...rest} {...routeProps}/>}/>
        )
    } else {
        return <Redirect to="/" />
    }
}

export default PublicRoute;