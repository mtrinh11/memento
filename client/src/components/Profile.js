import React, {Component} from 'react';

import {GetProfile} from '../services/UserServices';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

export default class Profile extends Component {
    constructor() {
        super()
        this.state = {
            error: false,
            date: '',
            startDate: (new Date ((new Date()).setDate((new Date()).getDate() - 117))).toLocaleDateString(),
            endDate: (new Date ((new Date()).setDate((new Date()).getDate() +7))).toLocaleDateString()
        }
    } 

    componentDidMount() {

    }

    dateArray = (start, end) => {
        let dateArray = [];
        let startDate = new Date(start);
        let endDate = new Date(end)
        while (startDate <= endDate) {
            dateArray.push(new Date(startDate));
            startDate.setDate(startDate.getDate() + 1);
        }
        return dateArray
    }

    render() {
        console.log(this.state)
        return (
            <div style={{width:'70%', flexGrow:'1', padding: "80px"}}>
                <p> Date: {this.state.date}</p>
                <CalendarHeatmap
                    showWeekdayLabels={false}
                    showMonthLabels={true}
                    showOutOfRangeDays={true}
                    startDate={(new Date ((new Date()).setDate((new Date()).getDate() - 110))).toLocaleDateString()}
                    endDate={(new Date(Date.now())).toLocaleDateString()}
                    onMouseOver={(event, value) => (this.setState({date: value.date.toDateString()}))}
                    // onClick={() => (this.props.history.push('/profile/:journalentry_id'))}
                    classForValue={(value) => {
                    if (!value) {
                        return 'color-empty';
                    }
                    return `color-scale-${value.count}`;
                    }}
                    values={
                        this.dateArray(this.state.startDate, this.state.endDate).map((value) => ({date: value, count: 1}))
                    }
                />          
            </div>
            

        )
    }
}