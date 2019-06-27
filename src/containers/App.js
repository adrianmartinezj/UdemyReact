import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';

class App extends Component {

  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    // 'persons' name is up to user
    persons: [
      {id: 'asdf', name: 'Adrian', age: 24},
      {id: 'asdfas', name: 'Manu', age: 29},
      {id: 'asgads', name: 'Stephanie', age: 26}
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  }

  //React lifestyle hook
  static getDerivedStateFromProps(props, state){
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    // return false; straight up breaks the update cycle
    return true; // will always update the virtual DOM
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  nameChangedHandler = (event, id) => {
    //findIndex works like map, will execute function on every element
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    // spread operator will create new object copy instead of pointer ref
    const person = {
      ...this.state.persons[personIndex]
    }

    // alternate way of doing it
    // const person = Object.assign({}, this.state.persons[personIndex]);
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    // Best practice for state updates that depend on the old state
    this.setState((prevState, props) => {
      return {
      persons: persons,
      changeCounter: prevState.changeCounter + 1};
     });
  };

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  render() {
    console.log('[App.js] render');
    let persons = null;

    if (this.state.showPersons){
      persons = (
          <Persons 
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler} 
            isAuthenticated={this.state.authenticated}  
          />
      );
      
    }

    return (
        <Aux>
          <button onClick={() => this.setState({showCockpit: false})}>Remove Cockpit</button>
          <AuthContext.Provider value={{
            authenticated: this.state.authenticated,
            login: this.loginHandler
          }}>
            {this.state.showCockpit ? <Cockpit 
              title={this.props.children}
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.length}
              clicked={this.togglePersonsHandler}
            />
              : null }
            {persons}
          </AuthContext.Provider>
        </Aux>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, "Hi, I'm a React App!!!"));
  }
}

export default withClass(App, classes.App);
