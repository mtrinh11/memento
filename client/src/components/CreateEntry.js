
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import TextInput from '../components/TextInput'
import {LogEntry} from '../services/JournalEntryServices'

export default class CreateEntry extends Component {
    constructor() {
      super()
      this.state = {
          formError: false,
          date: '',
          entry: '',
          sleep: '',
      }
    }
  
    handleChange = ({ target }) => {
      this.setState({ [target.name]: target.value, formError: false })
    }
  
    handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const loginData = await LogEntry(this.state, this.props.currentUser)
        console.log(loginData)
        this.props.history.push('/profile')
        this.setState({ formError: false })
      } catch (error) {
        console.log(error)
        this.setState({ formError: true })
      }
    }

    render() {
        console.log(this.state)
      const { date, entry, sleep } = this.state
      return (
        <div className="signin flex-col">
          <form className="flex-col" onSubmit={this.handleSubmit}>
            <TextInput
              required='true'
              placeholder="Date"
              name="date"
              type="date"
              value={date}
              onChange={this.handleChange}
            />
            <TextInput
              style={{width: '100%', textAlign: 'center'}}
              placeholder="How many hours did you sleep last night?"
              name="sleep"
              type="number"
              value={sleep}
              onChange={this.handleChange}
            />
            <TextInput
              required='true'
              fieldType='textfield'
              placeholder="Today I..."
              style={{width: '100%', height: "200px"}}
              name="entry"
              type="textarea"
              value={entry}
              onChange={this.handleChange}
            />
            {/* <TextInput
              placeholder="Today I..."
              name="entry"
              type="text"
              value={entry}
              onChange={this.handleChange}
            /> */}
            <br/><br/>
            <button>Enter</button>
            <br/><br/>
            <NavLink activeClassName="nav-active" to="/profile">
          Sign In
        </NavLink>
            {this.state.formError ? <p>Error While Submitting Entry</p> : <p></p>}
          </form>
        </div>
      )
    }
  }
  