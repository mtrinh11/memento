import React, {Component} from 'react';
import {GetHabits, CreateTracker, UpdateTracker, DeleteTracker} from '../services/HabitServices'

import DeleteButton from '../components/DeleteButton'
import UploadButton from '../components/UploadButton'

export default class HabitsPage extends Component {
    constructor() {
        super()
        this.state = {
            exists: false,
            habitsId: '',
            habitsArray:[],
            addItem: ''
        }
    }

    componentDidMount() {
        this.doesTrackerExist();
    }

    doesTrackerExist = async() => {
        let res = await GetHabits(this.props.currentUser._id)
        if (res.msg === false) {
            this.setState({exists: false})
            return
        }
        this.setState({exists: true})
        this.setState({habitsArray: res.habits})
        this.setState({habitsId: res._id})
        return
    } 

    makeTracker = async() => {
        await CreateTracker(this.props.currentUser._id)
        this.doesTrackerExist()
    }

    handleChange = ({ target }) => {
        this.setState({ addItem: target.value})
    }
    
    addToTracker = async(e) => {
        e.preventDefault()
        try {
            await UpdateTracker(this.state.habitsId, {habits: [...this.state.habitsArray, this.state.addItem.trim()]})
            this.setState({ addItem: ''})
            this.doesTrackerExist();
        } catch (error) {
            throw error
        }
    }
    
    deleteCurrentTracker = async() => {
        try {
            await DeleteTracker(this.props.currentUser._id, this.state.habitsId)
            this.setState({exists: false})
            this.doesTrackerExist();
        } catch (error) {
            throw error
        }
    }

    deleteOneItem = async(e) => {
        try {
            const clicked = e.target.innerHTML.trim()
            const modifiedArray = this.state.habitsArray.filter((item) => {
                if (item !== clicked) {
                    return true
                }
                return false
            })
            await UpdateTracker(this.state.habitsId, {habits: [...modifiedArray]})
            this.doesTrackerExist()
        } catch (error) {
            throw error
        }
        
    }

    render() {
        return ( 
            <div style={{padding: '50px'}}>
                { this.state.exists ?
                    <div> 
                        <p>Currently Tracking:</p>
                        <form  onSubmit={this.addToTracker}>
                            <input onChange={this.handleChange} placeholder='ex. Meditation' value={this.state.addItem}>
                            </input> 
                        </form>
                        <div style={{paddingLeft: '30px'}}> 
                            {this.state.habitsArray.map((val, index) => 
                            <p key={index} onClick={this.deleteOneItem}>{val} </p>
                            )}
                        </div>
                        
                        <div style={{marginTop: '40px'}}> 
                            <DeleteButton onclick={() => this.deleteCurrentTracker()} text='Start From Scratch'></DeleteButton>
                        </div>
                    </div> 
                    :
                    <h2> You aren't tracking any habits! 
                        <br></br>                  
                        <div style={{marginTop: '40px'}}> 
                            <UploadButton onclick={() => this.makeTracker()} text='Start Tracking'></UploadButton>
                        </div>
                    </h2>
                }
            </div>
        )
    }
}