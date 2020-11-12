import '../styles/Router.css'

import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Nav from './Nav'
import Sidebar from './Sidebar'

import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

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
            console.log('session', session)
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
      
      dateArray = (start, end) => {
        let dateArray = [];
        let startDate = new Date(start);
        let endDate = new Date(end)
        while (startDate <= endDate) {
          dateArray.push(new Date(startDate));
          startDate.setDate(startDate.getDate() + 1);
        }
        return dateArray
      }

      render() {
          return (
            <main>
              {/* <h1>mem</h1> */}
              <Nav 
                className='navbar' 
                authenticated={this.state.authenticated}
                currentUser={this.state.currentUser}
              />
              <Sidebar className='sidebar'/>
              <div style={{margin:"100px"}}>
                <CalendarHeatmap
                showWeekdayLabels={false}
                showMonthLabels={true}
                showOutOfRangeDays={true}
                startDate={new Date('2020-08-01')}
                // today = `${Date.now.getFullYear}-${Date.now.getMonth 3}-${Date.now.getDay}`
                endDate={new Date().toLocaleDateString()}
                onMouseOver={(event, value) => console.log(value)}
                classForValue={(value) => {
                  if (!value) {
                    return 'color-empty';
                  }
                  return `color-scale-${value.count}`;
                }}
                values={
                  this.dateArray('2020-08-01', '2020-11-30').map((value) => ({date: value, count: 2}))
                  // { date: '2020-10-01', count: 1 },
                  // { date: '2020-10-22', count: 2 },
                  // { date: '2020-11-15', count: 2 },
                  // ...and so on
                }
              />
              </div>
              

            {this.state.pageLoading ? (
              <h3>Loading...</h3>
            ) : (
              <Switch>
                {/* <Route
                  exact
                  path="/"
                  component={() => (
                    <LandingPage>
                      <Home />
                    </LandingPage>
                  )}
                /> */}
                <Route
                  path="/register"
                  component={(props) => (
                    <div>                  
                      <SignUp {...props} />
                    </div>
                  )}
                />
                <Route
                  path="/login"
                  component={(props) => (
                      <SignIn
                        toggleAuthenticated={this.toggleAuthenticated}
                        {...props}
                      />
                  )}
                />
                {/* <Route
                  path="/discover"
                  component={(props) => (
                    <Layout
                      currentUser={this.state.currentUser}
                      authenticated={this.state.authenticated}
                    >
                      <Discover {...props} />
                    </Layout>
                  )}
                />
                <Route
                  path="/posts/:post_id"
                  component={(props) => (
                    <Layout
                      currentUser={this.state.currentUser}
                      authenticated={this.state.authenticated}
                    >
                      <ViewPost {...props} />
                    </Layout>
                  )}
                />
                <ProtectedRoute
                  authenticated={this.state.authenticated}
                  path="/profile"
                  component={(props) => (
                    <Layout
                      currentUser={this.state.currentUser}
                      authenticated={this.state.authenticated}
                    >
                      <Profile {...props} currentUser={this.state.currentUser} />
                    </Layout>
                  )}
                />
                <ProtectedRoute
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
                />
                <ProtectedRoute
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
