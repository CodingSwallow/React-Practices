import React, { Component } from 'react';
import Record from './Record';
import RecordForm from './RecordForm';
import * as RecordsAPI from '../utils/RecordsAPI';
import AmountBox from './AmountBox';

class Records extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      records: []
    }
  }

  componentDidMount() {
    RecordsAPI.getAll().then(
      response => this.setState({
        records:response.data,
        isLoaded:true
      })
    ).catch(
      error => this.setState({
        error:error,
        isLoaded:true
      })
    )
  }
  
  handleAddRecord(record) {
    this.setState({
      records:[
        ...this.state.records,
        record
      ]
    });
  }

  handleEditRecord(records) {
    let oldRecords = this.state.records;
    let newRecords = [];
    let border;
    oldRecords.map((item, index)=>{
      if (item.id === records.id) {
        border = index;
      }
    });
    newRecords = oldRecords.slice(0, border);
    newRecords.push(records);
    newRecords = [...newRecords, ...oldRecords.slice(border+1)];
    this.setState({records:newRecords});
  }

  handleDeleteRecord(record) {
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.filter((item, index) => { return index !== recordIndex });
    console.log(newRecords);
    this.setState({records:newRecords});
  }

  credit() {
    let credits = this.state.records.filter((record) => {
      return record.amount >= 0;
    })

    return credits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0);
    }, 0)
  }

  debit() {
    let debits = this.state.records.filter((record) => {
      return record.amount < 0;
    })

    return debits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0);
    }, 0)
  }

  balance() {
    return this.credit() + this.debit();
  }

  render() {
    const {error, isLoaded, records} =  this.state;
    let recordsComponent;
    if (error) {
      recordsComponent = <div>Error: "{error.message}"</div>;
    } else if (!isLoaded) {
      recordsComponent = <div>Loading...</div>;
    } else {
      recordsComponent = (
          <table className='table table-bordered'>
            <thead>
              <tr>
                <td>Date</td><td>Title</td><td>Amounts(￥)</td><td>Options</td>
              </tr>
            </thead>
            <tbody>
              {records.map((record)=>
                <Record 
                  key={record.id} 
                  record={record} 
                  onEditRecord={this.handleEditRecord.bind(this)}
                  onDeleteRecord={this.handleDeleteRecord.bind(this)}
                  />)}
            </tbody>
          </table>
      );
    }

    return (
      <div>
        <h1>RECORDS</h1>
        <div className='row mb-3'>
          <AmountBox text='Credit' type='success' amount={this.credit()}/>
          <AmountBox text='Debit' type='danger' amount={this.debit()}/>
          <AmountBox text='Balance' type='info' amount={this.balance()}/>
        </div>
        <RecordForm onAddRecord={this.handleAddRecord.bind(this)} />
        {recordsComponent}
      </div>
    );
  }
}

export default Records;
