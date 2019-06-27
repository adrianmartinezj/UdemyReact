import React, { useEffect } from 'react';

import classes from './Cockpit.css';


const cockpit = (props) => {
    useEffect(() => {
      console.log('[Cockpit.js] useEffect');
      // Http request...
      setTimeout(() => {
        alert('Saved data to cloud!');
      }, 1000);
      return () => { //this will run before the regular useEffect function, but after the first render cycle
        // clearTimeout(timer);
        console.log('[Cockpit.js] cleanup work in useEffect');
      };
    }, []); // empty array means no dependencies making use effect only execute once at start
    // [props.persons] Will only effect on persons property changing..

    useEffect(() => {
      console.log('[Cockpit.js] 2nd useEffect');
      return () => { //this will run before the regular useEffect function, but after the first render cycle
        console.log('[Cockpit.js] cleanup work in 2nd useEffect');
      }
    }); // no arguments causes useEffect to run every render cycle
    //useEffect() could do multiple for multiple changed properties

    const assignedClasses = [];
    let btnClass = '';
    if ( props.showPersons) {
        btnClass = classes.Red;
    }
    if(props.personsLength <= 2){
      assignedClasses.push(classes.red); //classes = ['red']
    }
    if(props.personsLength <= 1){
      assignedClasses.push(classes.bold); //classes = ['red', 'bold']
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button
            className = {btnClass}
            onClick={props.clicked}>Toggle Persons
            </button>
        </div>
    );
};

// Saves a snapshot of an object, used for functional components
// that do not change internally, just based on the input props
export default React.memo(cockpit);