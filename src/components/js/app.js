import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {refreshAuthToken} from '../../actions/auth'

import Home from './home';
import Signup from './signup';
import Login from './login';
import Dashboard from './dashboard';
import SubInfo from './sub-info';
import SubEdit from './sub-edit';
import Summary from './summary';
import SubAdd from './sub-add';
import About from './about';

import '../css/app.css';

export class App extends React.Component {
  componentDidMount() {
    if (this.props.hasAuthToken) {
        // Try to get a fresh auth token if we had an existing one in
        // localStorage
        this.props.dispatch(refreshAuthToken());
    }
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.loggedIn && !this.props.loggedIn) {
          // When we are logged in, refresh the auth token periodically
          this.startPeriodicRefresh();
      } else if (!nextProps.loggedIn && this.props.loggedIn) {
          // Stop refreshing when we log out
          this.stopPeriodicRefresh();
      }
  }

  componentWillUnmount() {
      this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
      this.refreshInterval = setInterval(
          () => this.props.dispatch(refreshAuthToken()),
          60 * 60 * 1000 // One hour
      );
  }

  stopPeriodicRefresh() {
      if (!this.refreshInterval) {
          return;
      }

      clearInterval(this.refreshInterval);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/signup" component={Signup}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/dashboard" component={Dashboard}/>
              <Route exact path="/subscription/show/:sub" component={SubInfo}/>
              <Route exact path="/subscription/add" component={SubAdd}/>
              <Route exact path="/subscription/edit/:sub" component={SubEdit}/>
              <Route exact path="/summary" component={Summary}/>
              <Route exact path="/about" component={About}/>
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default connect(mapStateToProps)(App);
