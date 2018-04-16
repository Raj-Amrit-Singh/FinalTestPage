import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import dateDemo from './CandidateCredentials.json'
import { FetchQuestion } from './FetchQuestion.js'
import { Instructions } from './Instructions'
import queryString, { parseUrl } from 'query-string'

class datePicker extends React.Component {
    constructor(props) {
        super(props);
        this.canddate = null;
        this.today = null;
        this.getUrl = null;
        this.state = {
            counter: 0,
            candidateSchedule: {},
            dateFlag: null,
        };
        //this.state.dateFlag = null;
        this.startTest = this.startTest.bind(this);
        this.Cid = null;
        this.Sid = null;
        this.checkSchedule = this.checkSchedule.bind(this);
        this.checkDate = this.checkDate.bind(this);
        this.checkTime = this.checkTime.bind(this);
    }

    fetchUrlParams() {
        const parsedURL = queryString.parseUrl(location.href);
        this.Cid = parsedURL.query.Cid;
        this.Sid = parsedURL.query.Sid;
        this.Cid = this.Cid.substr(0,15);
        console.log(this.Sid);
        let scheduleApi = `https://trailrecruitment01-dev-ed.my.salesforce.com/services/apexrest/CandidateScheduleRestHandler/${this.Cid}`;
        var that = this;
        var xhttp = new XMLHttpRequest();
        var token = this.Sid;
        var jsonObject = void 0;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                that.setState({
                    candidateSchedule: JSON.parse(this.responseText)
                });
                that.checkSchedule();
            }
        };
        xhttp.open("GET", scheduleApi, true);
        xhttp.setRequestHeader('Authorization', 'Bearer ' + token);
        xhttp.setRequestHeader('Access-Control-Allow-Origin', 'https://trailrecruitment01-dev-ed--c.ap5.visual.force.com');
        xhttp.send();
    }
    

    checkSchedule() {
        let schedule = this.state.candidateSchedule.Date_And_Time__c;
        let temp = schedule.split('T');
        let date = temp[0];     //This is the date of candidate
        temp = temp[1]
        temp = temp.split('.');
        let time = temp[0];     //This is the time of candidate
        let today = new Date().toUTCString();
        temp = today.split('GMT');
        today = new Date(temp[0]);
        let candDate = new Date(`${date} ${time}`);
        this.checkDate(today, candDate);
        if (this.state.flag != 0) {
            this.checkTime(today, candDate);
        }
    }

    checkDate(today, candDate) {
        if (today.getDate == candDate.getDate && today.getMonth == candDate.getMonth && today.getFullYear == candDate.getFullYear) {
            this.setState({
                dateFlag: 1
            });
        }
        else {
            this.setState({
                dateFlag: 0
            });
        }
    }

    checkTime(today, candDate) {
        let currentTime = Math.floor(today.getTime() / 1000);
        let candTime = Math.floor(candDate.getTime() / 1000);
        let timeDiff = Math.abs(candTime - currentTime);
        timeDiff = timeDiff / 60;
        if (timeDiff > 60) {
            this.setState({
                dateFlag: 2,
            })
        }
        else {
            this.setState({
                dateFlag: 3
            });
        }
    }


    componentWillMount() {
        this.fetchUrlParams();
    }

    startTest() {
        this.setState({
            counter: this.state.counter + 1,
        })
    }

    render() {
        if (this.state.counter == 1) {
            return (<FetchQuestion Cid={this.Cid} Sid={this.Sid}/>)
        }
        if (this.state.dateFlag == 0) {
            return (<div align="center">
                <h1>Your date has not arrived yet</h1>
            </div>)
        }
        else if (this.state.dateFlag == 2) {
            return (
                <div align="Center">
                    <h1>Your time has either not arrived or you missed your exam</h1>
                </div>
            );
        }
        else if (this.state.dateFlag == 3) {
            return (<div align="Center">
                <Instructions startTest={this.startTest} />
            </div>);
        }
        else {
            return (
                <div></div>
            )
        }
    }
};

export default datePicker