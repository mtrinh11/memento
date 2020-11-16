import React, {Component} from 'react';
import {GetHabits, CreateTracker, UpdateTracker, DeleteTracker} from '../services/HabitServices'

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
        console.log(res)
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
        console.log(this.state)
        return ( 
            <div style={{padding: '50px'}}>
                { this.state.exists ?
                    <div> Currently Tracking:
                        {this.state.habitsArray.map((val, index) => 
                            <p key={index} onClick={this.deleteOneItem}>{val} </p>
                        )}
                        <form  onSubmit={this.addToTracker}>
                            <input onChange={this.handleChange} placeholder='ex. Meditation'>
                            </input> 
                        </form>
                        <button onClick={this.deleteCurrentTracker} style={{marginTop: '20px'}}>delete</button>
                    </div> 
                    :
                    <h2> You aren't tracking any habits!                  
                        <button onClick={this.makeTracker}> Start Tracking!</button>
                    </h2>
                }
            </div>
        )
    }
}