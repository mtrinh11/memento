import React, {Component} from 'react';
import {GetEntry, DeleteEntry} from '../services/JournalEntryServices';

export default class DisplayEntry extends Component {
    constructor() {
        super()
        this.state = {
            entry:'',
        }
    }

    componentDidMount() {
        this.getJournalEntry();

    }

    getJournalEntry = async() => {
        const entry = await GetEntry(this.props.match.params.post_id)
        this.setState({entry: entry})
        return
    }

    getReadableDate = () => {
        const readable = (new Date(`${this.state.entry.date}T00:00:00`)).toDateString()
        return readable
    }

    deleteEntry = async() => {
        await DeleteEntry(this.props.currentUser._id, this.state.entry._id);
        this.props.history.push('/profile')
        return
    }

    sendUpdate = async() => {
        this.props.history.push(`/profile/entry/update/${this.state.entry._id}`)
        return
    }
    render() {
        console.log(this.state)
        return (
            <div style={{padding: "50px", width: "100%"}}>
                <h2>Date: {this.getReadableDate()}</h2>
                <h3 style={{ borderTop: "solid", padding: "20px"}}>Entry</h3>
                <p style={{textAlign:'center', paddingBottom: '30px'}}> {this.state.entry.entry}</p>
                <h3 style={{ borderTop: "solid", padding: "20px"}}>Vitals</h3>
                <p> {this.state.entry.sleep}</p>
                <button onClick={this.sendUpdate} style={{margin: "10px"}}>Edit Entry</button>  
                <button onClick={this.deleteEntry}>Delete Entry</button>
            </div>         
        )
    }
}

