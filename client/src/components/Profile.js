import React, {Component} from 'react';

import {GetEntry, GetAllEntrys} from '../services/JournalEntryServices'
// import {GetProfile} from '../services/UserServices'

import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

export default class Profile extends Component {
    constructor() {
        super()
        this.state = {
            pageLoading: true,
            error: false,
            date: '',
            startDate: (new Date ((new Date()).setDate((new Date()).getDate() - 117))).toISOString().slice(0,10),
            endDate: (new Date ((new Date()).setDate((new Date()).getDate() +7))).toISOString().slice(0,10),
            heatmap: []
        }
    } 

    componentDidMount = () => {
        this.populateDateArrayWithEntrys()
    }

    dateArray = (start, end) => {
        let dateArray = [];
        let startDate = new Date(start);
        let endDate = new Date(end)
        while (startDate <= endDate) {
            dateArray.push(new Date(startDate).toISOString().slice(0,10));
            startDate.setDate(startDate.getDate() + 1);
        }
        return dateArray
    }

    populateDateArrayWithEntrys = async() => {
        try {
            let baseDateArray = this.dateArray(this.state.startDate, this.state.endDate).map((value) => ({date: value, count: 1}))
            const userEntrys=[]
            const allEntryIds = await GetAllEntrys(this.props.currentUser._id)
            for (const x of allEntryIds) {
                let singleEntry = await GetEntry(x);
                userEntrys.push({date: singleEntry.date, count:2, _id: singleEntry._id})
            }
            this.setState({heatmap: [...baseDateArray, ...userEntrys]})
            this.setState({ pageLoading: false })
            return 
        } catch (error) {
            this.setState({error: true})
        }    
    }

    render = () => {
        console.log(this.state)
        return (
            <div style={{width:'70%', flexGrow:'1', padding: "80px"}}>
                <p> Date: {this.state.date}</p>
                {this.state.pageLoading ? (
                    <h3>Loading...</h3>
                    ) : (
                        <CalendarHeatmap
                            showWeekdayLabels={false}
                            showMonthLabels={true}
                            showOutOfRangeDays={true}
                            startDate={(new Date ((new Date()).setDate((new Date()).getDate() - 110))).toLocaleDateString()}
                            endDate={(new Date(Date.now())).toLocaleDateString()}
                            onMouseOver={(event, value) => {
                                return this.setState({date: (new Date(`${value.date}T00:00:00`)).toDateString()})
                            }}
                            onClick={(event) => (event.count===2 ? this.props.history.push(`/profile/entry/${event._id}`) : null)}
                            classForValue={(value) => {
                                if (!value) { return 'color-empty'; }
                                return `color-scale-${value.count}`;
                            }}
                            values={this.state.heatmap}
                        />
                    )
                }
            </div>
        )
    }
}