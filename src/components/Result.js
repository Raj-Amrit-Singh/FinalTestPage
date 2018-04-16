import React, { Component } from 'react';

export function Result (props){
  
  return(
    <section id="pricing" className="pad-lg">
      <div className="container" >
        <div className="row margin-40">
          <div className="col-sm-8 col-sm-offset-2 text-absolute">
            <h1 className="white text-center">You have completed your test successfully </h1>
            <hr></hr>
           
            <br />
            <div>
              <li><span >Thank you for attempting this test, our HR will contact you soon with Results, All the Best.</span></li>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}