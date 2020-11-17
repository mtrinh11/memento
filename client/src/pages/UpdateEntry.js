
import React, { Component } from 'react'

import TextInput from '../components/TextInput'
import {EditEntry, GetEntry} from '../services/JournalEntryServices'
import {GetHabits} from '../services/HabitServices';
import SaveButton from '../components/SaveButton'
import UploadButton from '../components/UploadButton'
import DeleteButton from '../components/DeleteButton'

const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME
const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET

export default class UpdateEntry extends Component {
    constructor() {
      super()
      this.state = {
          formError: false,
          date: '',
          dietTracker:[],
          entry: '',
          sleep: '',
          habits: [],
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

    populate = async() => {
        const entry = await GetEntry(this.props.match.params.post_id)
        this.setState({
            date: entry.date,
            entry: entry.entry,
            sleep: entry.sleep,
            habits: entry.habits,
            dietTracker: entry.dietTracker,
            imgUrls: entry.imgUrls
        })
    }

    componentDidMount() {
      this.fetchHabits()
      this.populate()
    }
  
    handleChange = ({ target }) => {
      this.setState({ [target.name]: target.value, formError: false })
    }
  
    handleSubmit = async (e) => {
      e.preventDefault()
      try {
        await EditEntry(this.props.match.params.post_id, this.state)
        this.setState({ formError: false })
        this.props.history.push(`/profile/entry/${this.props.match.params.post_id}`)
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
      console.log(this.state)
      return (
        <div style={{padding:'100px', width:'100%'}}>
            <h2> Updating Entry: </h2>
          <form className="flex-col" onSubmit={this.handleSubmit}>
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
            <div style={{marginBottom:'50px', textAlign: 'center'}}>
              {(this.state.habits && this.state.habits.length >= 1) ? 
                <div style={{marginBottom:'50px'}}>
                  {this.state.habits.map((val, index) => (
                    <div key={index}>
                      <input 
                        checked={Object.values(val)[0]}
                        type="checkbox" 
                        value={index} 
                        onChange={this.habitDone} 
                        style={{textAlign:"left", width:"10px", marginRight: "10px", display: "inline" }}
                      />
                      <p style={{width: '10px', display:'inline'}}>{Object.keys(val)}</p>
                    </div>
                  ))}
                </div> 
                : 
                <p>no habits</p>
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
            
            <br/><br/>
            <SaveButton></SaveButton>
            <br/><br/>
            {this.state.formError ? <p>Error While Submitting Entry</p> : <p></p>}
          </form>
        </div>
      )
    }
  }
  