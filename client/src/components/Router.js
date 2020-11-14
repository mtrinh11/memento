
import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import HomePage from '../pages/HomePage';
import DisplayEntry from '../pages/DisplayEntry';

import Layout from './Layout'
import Sidebar from './Sidebar'
import ProtectedRoute from './ProtectedRoute';
import Profile from './Profile';
import CreateEntry from './CreateEntry';

import { CheckSession } from '../services/UserServices'

class Router extends Component {
    constructor() {
        super()
        this.state = {
            authenticated: false,
            currentUser: null,
            pageLoading: true
        }
    }

    verifyTokenValid = async() => {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const session = await CheckSession();
            this.setState(
              {currentUser: session, authenticated: true},
              () => this.props.history.push('/profile')
            )
          } catch (error) {
            this.setState({currentUser: null, authenticated: false})
            localStorage.clear()
          }
        }
      }
    
      toggleAuthenticated = (value, user, done) => {
        this.setState({authenticated: value, currentUser: user}, () => done())
      }
    
      componentDidMount() {
        this.verifyTokenValid()
        this.setState({ pageLoading: false })
      }
    
      verifyTokenValid = async () => {
        const token = localStorage.getItem('token')
        if (token) {
          try {
            const session = await CheckSession()
            this.setState(
              {
                currentUser: session.user,
                authenticated: true
              },
              () => this.props.history.push('/profile')
            )
          } catch (error) {
            this.setState({ currentUser: null, authenticated: false })
            localStorage.clear()
          }
        }
      }

      toggleAuthenticated = (value, user, done) => {
        this.setState({ authenticated: value, currentUser: user }, () => done())
      }

      render() {
          return (
            <main>
              {this.state.pageLoading ? (
                <h3>Loading...</h3>
              ) : (
              <Switch>
                <Route
                  exact
                  path="/"
                  component={() => (
                    <Layout>
                      <HomePage />
                    </Layout>
                  )}
                />
                <Route
                  path="/register"
                  component={(props) => (
                    <Layout>
                      <SignUp {...props} />
                    </Layout>                 
                  )}
                />
                <Route
                  path="/login"
                  component={(props) => (
                    <Layout>
                      <SignIn
                        toggleAuthenticated={this.toggleAuthenticated}
                        {...props}
                      />
                    </Layout>
                  )}
                />
                <ProtectedRoute
                  authenticated={this.state.authenticated}
                  exact path="/profile"
                  component={(props) => (
                    <Layout
                      currentUser={this.state.currentUser}
                      authenticated={this.state.authenticated}
                    >
                      <Sidebar User={this.state.currentUser}/>
                      <Profile {...props} currentUser={this.state.currentUser}/>
                    </Layout>
                  )}
                />
                <ProtectedRoute
                  authenticated={this.state.authenticated}
                  exact path="/profile/entry"
                  component={(props) => (
                    <Layout
                      currentUser={this.state.currentUser}
                      authenticated={this.state.authenticated}
                    >
                      <Sidebar User={this.state.currentUser}/>
                      <CreateEntry {...props} currentUser={this.state.currentUser._id}></CreateEntry>
                    </Layout>
                  )}
                />
                <ProtectedRoute
                  authenticated={this.state.authenticated}
                  exact path="/profile/entry/:post_id"
                  component={(props) => (
                    <Layout
                      currentUser={this.state.currentUser}
                      authenticated={this.state.authenticated}
                    >
                      <Sidebar User={this.state.currentUser}/>
                      <DisplayEntry {...props} currentUser={this.state.currentUser}/>
                    </Layout>
                  )}
                />
                {/* <ProtectedRoute
                  authenticated={this.state.authenticated}
                  path="/upload"
                  component={(props) => (
                    <Layout
                      currentUser={this.state.currentUser}
                      authenticated={this.state.authenticated}
                    >
                      <CreatePost {...props} currentUser={this.state.currentUser} />
                    </Layout>
                  )}
                /> */}
                {/* <ProtectedRoute
                  authenticated={this.state.authenticated}
                  path="/edit/:post_id"
                  component={(props) => (
                    <Layout
                      currentUser={this.state.currentUser}
                      authenticated={this.state.authenticated}
                    >
                      <UpdatePost {...props} currentUser={this.state.currentUser} />
                    </Layout>
                  )}
                /> */}
              </Switch>
            )}
          </main>
          )
      }
}

export default withRouter(Router)
