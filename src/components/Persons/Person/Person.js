import React, {Component} from 'react';

import Aux from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/withClass';
import classes from './Person.css';

class Person extends Component{
    render()
    {
        console.log('[Person.js] render');
        return (
            // Another way to return one element by wrapping in one HOC (Higher Order Component).
            // Fragment is another way to use Aux but it's included with React
            // they're exactly the same thing.
            <Aux>
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input 
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

export default withClass(Person, classes.Person);