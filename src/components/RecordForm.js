import React, { Component } from 'react';

export default class RecordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date:"",
            title:"",
            amount:""
        }
    }

    handleChange(event) {
        let name, obj;
        name = event.target.name;
        this.setState((
            obj = {},
            obj["" + name] = event.target.value,
            obj
        ));
    }

    valid() {
       return this.state.date &&  this.state.title && this.state.amount;
    }
    render() {
        return (
        <form className='form-inline'>
            <div className='form-group'>
                <input 
                    type='text'
                    className='form-control' 
                    placeholder='date' 
                    name='date' 
                    value={this.state.date}
                    onChange={this.handleChange.bind(this)}
                    />
            </div> 
            <div className='form-group'>
                <input type='text' 
                    className='form-control'
                    placeholder='title' 
                    name='title' 
                    value={this.state.title}
                    onChange={this.handleChange.bind(this)}
                    />
            </div> 
            <div className='form-group'>
                <input 
                    type='text' 
                    className='form-control'
                    placeholder='amount' 
                    name='amount' 
                    value={this.state.amount}
                    onChange={this.handleChange.bind(this)}
                    />
            </div> 
            <button className='btn btn-primary' type='submit' disabled={!this.valid()}>Create Record</button>
        </form>
        );
    }
}
