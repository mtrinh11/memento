
import React, { Component } from 'react'

import TextInput from '../components/TextInput'
import {LogEntry} from '../services/JournalEntryServices'
import {GetHabits} from '../services/HabitServices';

export default class CreateEntry extends Component {
    constructor() {
      super()
      this.state = {
          formError: false,
          date: '',
          entry: '',
          sleep: '',
          habits: [],
          todoList: [],
          dietTracker:[]
      }
    }

    componentDidMount() {
      this.fetchHabits()
    }
  
    handleChange = ({ target }) => {
      this.setState({ [target.name]: target.value, formError: false })
    }
  
    handleSubmit = async (e) => {
      e.preventDefault()
      try {
        await LogEntry(this.state, this.props.currentUser)
        this.props.history.push('/profile')
        this.setState({ formError: false })
      } catch (error) {
        this.setState({ formError: true })
      }
    }

    fetchHabits = async() => {
      try {
        let habitsWithTracking = []
        const res = await GetHabits(this.props.currentUser)
        if (res.habits) {
          habitsWithTracking = res.habits.map((val) => {return {[val]: false} })
        }
        this.setState({habits: habitsWithTracking})
      } catch (error){
        throw error
      }
    }

    habitDone = (e) => {
      const checkedHabit = this.state.habits
      checkedHabit[e.target.value] = {[Object.keys(checkedHabit[e.target.value])]: !(Object.values(checkedHabit[e.target.value])[0])}
      this.setState({habits: checkedHabit})
    }

    render() {
      console.log(this.state)
      const { date, entry, sleep, dietTracker } = this.state
      return (
        <div style={{padding:' 50px 100px', width:'100%'}}>
          <form className="" onSubmit={this.handleSubmit}>
            <p>Date</p>
            <TextInput
              style={{margin: '10px'}}
              required={true}
              placeholder="Date"
              name="date"
              type="date"
              value={date}
              onChange={this.handleChange}
            />
            <p>Sleep Tracker</p>
            <TextInput
              style={{width: '100%', textAlign: 'center', margin: '10px'}}
              placeholder="How many hours did you sleep last night?"
              name="sleep"
              type="number"
              value={sleep}
              onChange={this.handleChange}
            />
            <p>Diet Tracker</p>
            <TextInput
              fieldType='textfield'
              placeholder="ex. 10:00 oatmeal - 200 cals"
              style={{width: '100%', margin: '10px'}}
              name="dietTracker"
              type="textarea"
              value={dietTracker}
              onChange={this.handleChange}
            />
            <p>Entry</p>
            <TextInput
              required={true}
              fieldType='textfield'
              placeholder="Today I..."
              style={{width: '100%', height: "200px", margin: '10px'}}
              name="entry"
              type="textarea"
              value={entry}
              onChange={this.handleChange}
            />
            <p> Habit Tracker</p>
            {(this.state.habits && this.state.habits.length >= 1) ? 
              <div>
                {this.state.habits.map((val, index) => (
                  <div key={index}>
                    <input 
                      type="checkbox" 
                      value={index} 
                      onClick={this.habitDone} 
                      style={{textAlign:"left", width:"10px", marginRight: "10px", display: "inline" }}
                    />
                    <p style={{width: '10px', display:'inline'}}>{Object.keys(val)}</p>
                  </div>
                ))}
              </div> 
              : 
              <p>no habits</p>
            }
            <br/><br/>
            <button>Enter</button>
            <br/><br/>
            {this.state.formError ? <p>Error While Submitting Entry</p> : <p></p>}
          </form>
        </div>
      )
    }
  }
  