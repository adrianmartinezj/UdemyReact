import React, { useEffect, useRef, useContext } from 'react';

import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';


const cockpit = (props) => {
    // Similar to React.createRef(); but in functional components
    const toggleBtnRef = useRef(null);
    const authContext = useContext(AuthContext);

    console.log(authContext.authenticated);

    useEffect(() => {
      console.log('[Cockpit.js] useEffect');
      // Http request...
      // setTimeout(() => {
      //   alert('Saved data to cloud!');
      // }, 1000);

      //Good place to put this because it renders after
      // the render cycle executes. But only once because
      // of our empty array argument below
      toggleBtnRef.current.click();

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
              ref={toggleBtnRef}
              className = {btnClass}
              onClick={props.clicked}>Toggle Persons
            </button>
            <button 
              onClick={authContext.login}>
              Log in
            </button>
        </div>
    );
};

// Saves a snapshot of an object, used for functional components
// that do not change internally, just based on the input props
export default React.memo(cockpit);