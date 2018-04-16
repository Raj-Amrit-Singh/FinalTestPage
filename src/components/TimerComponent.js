import React from 'react'
import ReactDOM from 'react-dom';
import Timer from 'react-countdown-clock'

export function TimerComponent(props) {
  
    return(<div style={{position:'fixed'}}><Timer seconds={10*60}
        color="indianred"
        alpha={0.9}
        size={100}
        onComplete={props.triggerParentUpdate} /><br/></div>) 

}