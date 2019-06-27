import React, {PureComponent} from 'react';

import Person from './Person/Person';

//Parantheses means it automatically returns -- only works with arrow functions

// Pure component automatically checks to see if any props
// update, and effectively implement shouldComponentUpdate
// without us having to do anything
class Persons extends PureComponent {
  // static getDerivedStateFromProps(props, state) {
  //   console.log('[Persons.js] getDerivedStateFromProps');
  //   return state;
  // }

  //Historic update hook
  // componentWillReceiveProps(props){
  //   console.log('[Persons.js] componentWillReceiveProps', props);
  // }

  // shouldComponentUpdate(nextProps, nextState){
  //   //you have to return true or false here
  //   console.log('[Persons.js] shouldComponentUpdate');
  //   if (nextProps.persons !== this.props.persons) {
  //     return true;
  //   } else return false;
  // }

  getSnapshotBeforeUpdate(prevProps, prevState){
    console.log('[Persons.js] getSnapshotBeforeUpdate');
    return { message : 'Snapshot!'};
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    console.log('[Persons.js] componentDidUpdate');
    console.log(snapshot);
  }

  componentWillUnmount(){
    console.log('[Persons.js] componentWillUnmount');
  }

  render() {
    console.log('[Persons.js] render');
    return (
        this.props.persons.map( (person, index) => {
            return (<Person 
            click={() => this.props.clicked(index)}
            name={person.name} 
            age={person.age}
            key={person.id} // required if we return a list of elements in react
            changed={(event) => this.props.changed(event, person.id)} 
            isAuth={this.props.isAuthenticated}
            />
            );
          } )
      );
    }
  }

export default Persons;