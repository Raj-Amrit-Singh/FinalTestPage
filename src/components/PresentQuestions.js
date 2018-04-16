import React, { Component } from 'react';
import { myStyle } from '../css/Card'
import { parse } from 'qs';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';


export class PresentQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.qBank = props.Qbank;
    this.answerStore = props.answerStore;
    this.onButtonChange = this.onButtonChange.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.onButtonChange = this.onButtonChange;
    this.createButtons = this.createButtons.bind(this);
    this.prevQuestion = this.prevQuestion.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.selectQuestion = this.selectQuestion.bind(this);
    this.onButtonChange = this.onButtonChange.bind(this);
    this.state = {
      currentQuestion: 0,
      currentButton: [],
      color: "white",
    };
    this.buttonElements = [];
    this.tempFlag = 0;
  }

  createButtons() {
    //myStyle.selectedButtonStyle.backgroundColor = this.state.color;
    for (let i = 1; i <= 20; i++) {
      this.buttonElements.push(
        <div className="btn-group">

          <button className="btn btn-primary" id={i} key={i} onClick={() => this.selectQuestion(i)} className="btn btn-primary" >{i}</button>
          &nbsp;
        </div>
      )
    }
  }

  getOptions(myOptions) {
    let temp = this.qBank[this.state.currentQuestion].Options__c;
  }

  selectQuestion(key) {
    this.setState({
      currentQuestion: key - 1,
    })
  }

  prevQuestion() {
    if (this.state.currentQuestion > 0) {
      this.setState(prevState => ({
        currentQuestion: prevState.currentQuestion - 1,
      }));
    }
  }

  nextQuestion() {
    if (this.state.currentQuestion < 19) {
      this.setState(prevState => ({
        currentQuestion: prevState.currentQuestion + 1
      }));
    }
  }

  onButtonChange(value, id, answer) {
    let tempArray = this.state.currentButton;
    tempArray.push(value);
    this.setState((prevState) => ({
      currentButton: tempArray,
    }));
    this.answerStore(id, answer);
  }

  componentWillMount() {
    this.createButtons();
    /*  this.fetchURL(); */
  }

  toCheck(value) {
    let checkResult;
    let tempArray = this.state.currentButton;
    if ((tempArray.indexOf(value)) >= 0) {
      checkResult = true;
    }
    else checkResult = false;
    return checkResult;
  }

  render() {
    let tempState = this.state.currentQuestion;
    let myValue = (tempState * 4);
    let currentStatus = this.qBank[tempState];
    return (
      <div className="row margin-40 " >

        <div className="col-sm-12 col-sm-offset-1 text-absolute" style={{
          top: "-16px"
        }}>
          <h1 className="white text-center">Aptitude Test</h1>
          <hr ></hr>
          <div className="panel-group well well-lg">
            {/*  <div className="panel panel-default" > */}
            <div className="panel-heading " >Qusetion - " {currentStatus.Question__c} "</div>
            <div className="panel-body" >
              <div className="radio">
                <table>
                  <tr>
                    <td><label><input type="radio" key={tempState} style={{ position: "inherit" }} name={tempState} value={myValue + 1} checked={this.toCheck(myValue + 1)} onChange={() => this.onButtonChange(myValue + 1, currentStatus.Id, currentStatus.Options__c.option1)} />
                      &nbsp; {currentStatus.Options__c.option1}
                    </label></td>

                    <td><label style={{ marginLeft: "387px" }}>
                      <input type="radio" key={tempState = 1} style={{ position: "inherit" }} name={tempState} value={myValue + 2} checked={this.toCheck(myValue + 2)} onChange={() => this.onButtonChange(myValue + 2, currentStatus.Id, currentStatus.Options__c.option2)} />
                      &nbsp; {currentStatus.Options__c.option2}
                    </label></td></tr>
                  <tr> <td><label><input type="radio" key={tempState + 2} style={{ position: "inherit" }} name={tempState} value={myValue + 3} checked={this.toCheck(myValue + 3)} onChange={() => this.onButtonChange(myValue + 3, currentStatus.Id, currentStatus.Options__c.option3)} />
                    &nbsp; {currentStatus.Options__c.option3}
                  </label></td>
                    <td><label style={{ marginLeft: "387px" }}>
                      <input type="radio" key={tempState + 3} name={tempState} style={{ position: "inherit" }} value={myValue + 4} checked={this.toCheck(myValue + 4)} onChange={() => this.onButtonChange(myValue + 4, currentStatus.Id, currentStatus.Options__c.option4)} />
                      &nbsp; {currentStatus.Options__c.option4}
                    </label></td></tr>
                </table>
              </div>
            </div>
            <hr className="hrLine"></hr>
            <div className="btn-group " >
              &nbsp;
        <span className="inline">

                {this.buttonElements}
              </span>
            </div>
            &nbsp;
          <button className="previous round" onClick={this.prevQuestion}>Prev</button>
            <button className="next round" onClick={this.nextQuestion}>Next</button>

          </div>
        </div>
      </div>
      /*   </div> */
    );
  }
}
//export default QuestionPage