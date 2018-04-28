import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as RecordsAPI from '../utils/RecordsAPI';

class Record extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit:false
    }
  }

  handleEditStatus(event) {
    this.setState({edit:!this.state.edit});
  }

  handleEdit(event) {
    const record = {
      id:this.props.record.id,
      date:this.refs.date.value,
      title:this.refs.title.value,
      amount:Number.parseInt(this.refs.amount.value)
    }
    RecordsAPI.update(this.props.record.id, record).then( 
      response => {
        this.props.onEditRecord(record);
        this.setState({edit:!this.state.edit});
      }
    ).catch(
      error => console.log(error.message)
    );
  }

  handleDelete(event) {
    RecordsAPI.remove(this.props.record.id).then(
      response => {
        this.props.onDeleteRecord(this.props.record);
      }
    ).catch(
      error => console.log(error.message)
    );
  }

  recordForm() {
    return (
      <tr>
          <td><input className='form-control' defaultValue={this.props.record.date} ref='date'/></td>
          <td><input className='form-control' defaultValue={this.props.record.title} ref='title'/></td>
          <td><input className='form-control' defaultValue={this.props.record.amount} ref='amount'/></td>
          <td>
            <button className='btn btn-info mr-1' onClick={this.handleEdit.bind(this)}>update</button>
            <button className='btn btn-danger' onClick={this.handleEditStatus.bind(this)}>cancel</button>
          </td>
      </tr>
    );
  }

  recordRows() {
    return (
      <tr>
          <td>{this.props.record.date}</td>
          <td>{this.props.record.title}</td>
          <td>{this.props.record.amount}</td>
          <td>
            <button className='btn btn-info mr-1' onClick={this.handleEditStatus.bind(this)}>Edit</button>
            <button className='btn btn-danger' onClick={this.handleDelete.bind(this)}>Delete</button>
          </td>
      </tr>
    );
  }

  render() {
    return this.state.edit ? this.recordForm() : this.recordRows();
  }
}

Record.propTypes = {
    id:PropTypes.string,
    date:PropTypes.string,
    title:PropTypes.string,
    amount:PropTypes.number
}

export default Record;
