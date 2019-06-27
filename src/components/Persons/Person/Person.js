import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/withClass';
import classes from './Person.css';
import AuthContext from '../../../context/auth-context';

class Person extends Component{
    constructor(props) {
        super(props);
        //More modern approach to grab JSX elements
        this.inputElementRef = React.createRef();
    }

    // Easier access to context
    static contextType = AuthContext;

    componentDidMount() {
        // this.inputElement.focus();
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated);
    }

    render()
    {
        console.log('[Person.js] render');
        return (
            // Another way to return one element by wrapping in one HOC (Higher Order Component).
            // Fragment is another way to use Aux but it's included with React
            // they're exactly the same thing.
            <Aux>
                {this.context.authenticated ? <p>Authenticated!</p> : <p>Please log in!</p>}
                <p key="i1" onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p key="i2">{this.props.children}</p>
                <input 
                key="i3"
                // Older way to grab JSX Elements
                // ref={(inputEl) => {this.inputElement = inputEl}}
                ref={this.inputElementRef}
                type="text" 
                onChange={this.props.changed} 
                value={this.props.name}/>
            </Aux>
        );

        // Make an array to return without using a wrapping element
        // return [
        //     // <div className={classes.Person}>
        //         <p key="i1" onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>,
        //         <p key="i2">{this.props.children}</p>,
        //         <input key="i3"
        //         type="text" 
        //         onChange={this.props.changed} 
        //         value={this.props.name}/>
        //     // </div>
        // ];
    }
};

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default withClass(Person, classes.Person);