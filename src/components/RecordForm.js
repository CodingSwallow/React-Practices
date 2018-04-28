import React, { Component } from 'react';
import * as RecordsAPI from '../utils/RecordsAPI';

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

    handleSubmit(event) {
        event.preventDefault();
        let data = {date:this.state.date,title:this.state.title,amount:Number.parseInt(this.state.amount, 0)};
        RecordsAPI.create(data).then(
            response =>  {
                this.props.onAddRecord(response.data);
                this.setState({
                    date:"",
                    title:"",
                    amount:""
                });
            }
        ).catch(
            error => console.log(error.message)
        );
    }

    render() {
        return (
        <form className='form-inline mb-3' onSubmit={this.handleSubmit.bind(this)} >
            <div className='form-group mr-1'>
                <input 
                    type='text'
                    className='form-control' 
                    placeholder='date' 
                    name='date' 
                    value={this.state.date}
                    onChange={this.handleChange.bind(this)}
                    />
            </div> 
            <div className='form-group mr-1'>
                <input type='text' 
                    className='form-control'
                    placeholder='title' 
                    name='title' 
                    value={this.state.title}
                    onChange={this.handleChange.bind(this)}
                    />
            </div> 
            <div className='form-group mr-1'>
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
