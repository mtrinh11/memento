
import React, { Component } from 'react'
import TextInput from '../components/TextInput'
import {LogEntry} from '../services/JournalEntryServices'

export default class CreateEntry extends Component {
    constructor() {
      super()
      this.state = {
          formError: false,
          userID:'',
          date: '',
          entry: ''
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
      const { date, entry } = this.state
      return (
        <div className="signin flex-col">
          <form className="flex-col" onSubmit={this.handleSubmit}>
            <TextInput
              placeholder="Date"
              name="date"
              type="date"
              value={date}
              onChange={this.handleChange}
            />
            <TextInput
              placeholder="Today I..."
              name="entry"
              type="text"
              value={entry}
              onChange={this.handleChange}
            />
            <button>Enter</button>
            {this.state.formError ? <p>Error While Submitting Entry</p> : <p></p>}
          </form>
        </div>
      )
    }
  }
  