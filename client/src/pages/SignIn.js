import '../styles/Signup.css'
import React, { Component } from 'react'
import TextInput from '../components/TextInput'
import { LoginUser } from '../services/UserServices'
import SendButton from '../components/SendButton'

export default class SignIn extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      formError: false
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value, formError: false })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const loginData = await LoginUser(this.state)
      this.props.toggleAuthenticated(true, loginData.user, () =>
        this.props.history.push('/profile')
      )
    } catch (error) {
      this.setState({ formError: true })
    }
  }
  
  render() {
    const { email, password } = this.state
    return (
      <div className="signin flex-col" style={{textAlign: 'center'}}>
        <form className="flex-col" onSubmit={this.handleSubmit}>
          <TextInput
            placeholder="Your Email"
            name="email"
            type="email"
            value={email}
            onChange={this.handleChange}
          />
          <br/> <br/> <br/>
          <TextInput
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
          />
          <br/> <br/> <br/>
          <SendButton text='Sign In'></SendButton>
          {this.state.formError ? <p>Error While Logging In</p> : <p></p>}
        </form>
      </div>
    )
  }
}
