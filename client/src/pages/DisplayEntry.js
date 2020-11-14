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
            <div style={{padding: "50px"}}>
                <h2>Date: {this.getReadableDate()}</h2>
                <h3>vitals</h3>
                <p> {this.state.entry.sleep}</p>
                <p> {this.state.entry.entry}</p>
                
            </div>         
        )
    }
}

