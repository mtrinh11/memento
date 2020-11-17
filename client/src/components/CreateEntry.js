
import React, { Component } from 'react'

import TextInput from '../components/TextInput'
import {LogEntry} from '../services/JournalEntryServices'
import {GetHabits} from '../services/HabitServices';
import SaveButton from './SaveButton'
import UploadButton from './UploadButton'
import DeleteButton from './DeleteButton'

const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME
const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET

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
          dietTracker:[],
          imgUrls: [],
          widget: window.cloudinary.createUploadWidget(
            {
              cloudName: CLOUD_NAME, 
              uploadPreset: UPLOAD_PRESET,
              multiple: false,
              resourceType: "image", 
              maxFileSize: 1500000
            },
            (error, result) => {this.checkUpload(result)}
          )
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

    checkUpload = async (resultEvent) => {
      if (resultEvent.event === 'success') {
        try {
          const url = await resultEvent.info.secure_url
          if (url) {
              this.setState({imgUrls: [...this.state.imgUrls, url]})
          }
        } 
        catch(err) {throw err}
      }
    }

    deleteImg = (removeIndex) =>{
      let newImgArray = this.state.imgUrls.filter((val, index) => {
        if (index === removeIndex) {
          return false
        }
        return true
      })
      this.setState({imgUrls: newImgArray})
    }
    
    render() {
      const { date, entry, sleep, dietTracker } = this.state
      return (
        <div className="row"style={{padding:'50px 100px', width:'100%vh', height: "100%vh", flexGrow:'1'}}>
          <form className="col s12" onSubmit={this.handleSubmit}>
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
              style={{width: '100%', margin: '10px'}}
              name="entry"
              type="textarea"
              value={entry}
              onChange={this.handleChange}
            />
            <p> Habit Tracker</p>
            <div style={{textAlign: 'center'}}>
              {(this.state.habits && this.state.habits.length >= 1) ? 
              <div>
                {this.state.habits.map((val, index) => (
                  <div key={index} >
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
              <p>There are no habits in the Habit Tracker.</p>
              }
            </div>
            
            <p> Photos</p>
            <div >
              {(this.state.imgUrls && this.state.imgUrls.length > 0)? 
                <div> 
                  <div>
                    {this.state.imgUrls.map((val, index) => { return (
                      <div key={index} style={{display:'table', height: '100%', margin: '0 auto' }}> 
                        <img src={val} alt={index} style={{width:'200px', verticalAlign: 'middle'}}/>
                        <DeleteButton onclick={() => this.deleteImg(index)}text='Delete Photo'></DeleteButton>
                      </div>
                    )})}
                  </div>
                  <div style={{margin:"50px 0 0 20px", textAlign:'center'}}>
                    <UploadButton onclick={() => {this.state.widget.open()}} text='Upload Photo'></UploadButton>
                  </div>
                </div>
                  :
                <div style={{margin:"50px 0 0 20px", textAlign:'center'}}>
                  <UploadButton onclick={() => {this.state.widget.open()}} text='Upload Photo'></UploadButton>
                </div>
              }
            </div>
            
            {/* <div style={{margin:"50px 0 0 20px", textAlign:'center'}}>
              <UploadButton onclick={() => {this.state.widget.open()}} text='Upload Photo'></UploadButton>
              <p>You have uploaded {this.state.imgUrls.length === 1 ? `1 photo` : `${this.state.imgUrls.length} photos`}  for this entry.</p>
            </div> */}
            <br/><br/>
            <SaveButton></SaveButton>
            <br/><br/>
            {this.state.formError ? <p>Error While Submitting Entry</p> : <p></p>}
          </form>
        </div>
      )
    }
  }
  