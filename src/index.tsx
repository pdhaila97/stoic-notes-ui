import React from 'react';
import Box from '@material-ui/core/Box';
import ReactDOM from 'react-dom';
import { Switch, Router, Redirect } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import { ThemeProvider } from 'styled-components';
import { createMuiTheme }  from '@material-ui/core/styles'
import { createBrowserHistory as history} from 'history';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import AuthRoute from './AuthRoute';
import DashboardPage from './components/DashboardPage';
import Note from './components/Notes/Note';
import EditableNote from './components/Notes/EditableNote';
import PublicRoute from './PublicRoute';


const theme = createMuiTheme({});

function App () {
    return (
        <ThemeProvider theme={theme}>
            <Box height="inherit" width="inherit">
                <Router history={history()}>
                    <Switch>
                        <Redirect exact from="/" to="/dashboard"/>
                        <PublicRoute path="/landing" component={LandingPage} />
                        <PublicRoute path="/login" component={LoginPage} />
                        <PublicRoute path="/register" component={SignupPage} />
                        <AuthRoute path="/dashboard" component={DashboardPage} history={history()} />
                        <AuthRoute exact path="/note/:id" component={Note} history={history()}/>
                        <AuthRoute exact path="/note" component={EditableNote} note={{}} history={history()} isNew={true}/>
                    </Switch>
                </Router>
            </Box>
        </ThemeProvider>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));