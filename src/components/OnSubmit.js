import React, { Component } from 'react';

export function OnSubmit(props){
   return(
    <div  className="container col-sm-10 " align="center">
      <button onClick={props.checkAnswer} className="btn-lg btm-Submit" style={{backgroundColor: "#204d74",marginBottom: "25px"}} >Submit</button>
      <label></label>
      </div>
  )
}