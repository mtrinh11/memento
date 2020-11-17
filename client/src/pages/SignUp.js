import '../styles/Signup.css'

import React, { Component } from 'react'
import TextInput from '../components/TextInput'
import { RegisterUser } from '../services/UserServices'
import SendButton from '../components/SendButton'

export default class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await RegisterUser(this.state)
      this.props.history.push('/login')
    } catch (error) {
      throw error
    }
  }
  render() {
    const { name, password, email } = this.state
    return (
      <div className="signup flex-col" style={{textAlign:'center'}}>
        <form className="flex-col" onSubmit={this.handleSubmit}>
          <TextInput
            placeholder="Your Email"
            name="email"
            value={email}
            type="email"
            onChange={this.handleChange}
          />
          <br/> <br/> <br/>
          <TextInput
            placeholder="Your Name"
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
          <br/> <br/> <br/>
          <TextInput
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <br/> <br/> <br/>
          <SendButton text='Sign Up'></SendButton>
        </form>
      </div>
    )
  }
}
 