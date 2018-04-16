import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

import PresentQuestions from './PresentQuestions'

export function Instructions(props) {
  return (
    <section id="pricing" className="pad-lg">
   
    
      <div className="container">
        <div className="row margin-40">
          <div className="col-sm-8 col-sm-offset-2 text-absolute">
            <h1 className="white text-center">Aptitude Test</h1>
            <hr></hr>
            <h2>Instructions</h2>
            <h3>(Please read all instructions carefully.)</h3>
            <br />
            <div>
              <li><span >Do not Refresh this page while giving Test.</span></li>
            </div>
            <div>
              <li><span>After clicking Submit button,Your attempted answers will be submitted.</span></li>
            </div>
            <div>
              <li><span>After completion of "Timer",Your attempted answers will be submitted.</span></li>
            </div>
            <div>
                <div>
                <li><span>Non-attempted answers will be discarded.</span> </li>
                </div>
              <li> <span>Results will be calculated on the basis of attempted answers.</span></li>
            </div>
            <div>
              <li> <span>Once you click on Start , Timer will be initiated.</span></li>
            </div>
            <div>
              <li> <span>Click on Start button to start test whenever you are ready.</span></li>
            </div>
            <br />
            <div align="center">
              <button onClick={props.startTest} style={{ paddingLeft: 10, marginLeft: 10, padding: "9px 12px" }} className="btn btn-success btn-md">Start</button>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  )
}