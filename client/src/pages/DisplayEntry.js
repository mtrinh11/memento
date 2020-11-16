import React, {Component} from 'react';
import {GetEntry} from '../services/JournalEntryServices';

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
        const readable = (new Date(this.state.entry.date)).toDateString()
        return readable
    }

    render() {
        console.log(this.state.entry)
        return (
            <div style={{padding: "50px", width: "100%"}}>
                <h2>Date: {this.getReadableDate()}</h2>
                <h3 style={{ borderTop: "solid", padding: "20px"}}>Entry</h3>
                <p style={{textAlign:'center', paddingBottom: '30px'}}> {this.state.entry.entry}</p>
                <h3 style={{ borderTop: "solid", padding: "20px"}}>Notes</h3>
                <p> {this.state.entry.sleep}</p>
                {/* //need to implement deleteing and editing Entry */}
                <button  style={{margin: "10px"}}>Edit Entry</button>  
                <button>Delete Entry</button>
            </div>         
        )
    }
}

