import React, {Component} from 'react';
import {GetEntry, DeleteEntry} from '../services/JournalEntryServices';
import NoIconButton from '../components/NoIconButton'

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
        return (
            <div style={{padding: "50px", width: "100%"}}>
                <h2>Date: {this.getReadableDate()}</h2>

                <h3 style={{ borderTop: "solid", padding: "20px", paddingBottom: '20px'}}>Vitals</h3>
                <p> Sleep: {this.state.entry.sleep} hours</p>
                <p style={{ paddingBottom: '40px'}}>Diet:  {this.state.entry.dietTracker}</p>

                {(this.state.entry.habits && this.state.entry.habits.length > 0) ? 
                    <div>
                        <h3 style={{ borderTop: "solid", padding: "20px"}}>Habits</h3>
                        {this.state.entry.habits.map((val, index) => {
                            return (
                                <p key={index}>{Object.values(val)[0] ?<i className="large material-icons">check</i> : <i className="large material-icons">close</i>} {Object.keys(val)[0]} </p>
                            )
                        })}
                        <p style={{ paddingBottom: '40px'}}></p>
                    </div>
                    :
                    <div></div>
                }

                <h3 style={{ borderTop: "solid", padding: "20px"}}>Entry</h3>
                <p style={{textAlign:'center', paddingBottom: '30px'}}>
                    {(this.state.entry.imgUrls && this.state.entry.imgUrls.length > 0) ?
                        <div>
                            {this.state.entry.imgUrls.map((val, index) => { return (
                                <img src={val} alt={index}></img>
                            )})} 
                        </div>
                        : <div></div>
                    }
                    {this.state.entry.entry}
                </p>
                <NoIconButton onclick={() => {this.sendUpdate()}} text='Edit Entry'></NoIconButton>
                <NoIconButton onclick={() => {this.deleteEntry()}} text='Delete Entry'></NoIconButton>
            </div>
        )
    }
}