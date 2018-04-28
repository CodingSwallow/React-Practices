import React, { Component } from 'react';
import Record from './Record.js';
import RecordForm from './RecordForm.js';
import * as RecordsAPI from '../utils/RecordsAPI';

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
                <td>Date</td><td>Title</td><td>Amounts</td>
              </tr>
            </thead>
            <tbody>
              {records.map((record)=><Record key={record.id} {...record}/>)}
            </tbody>
          </table>
      );
    }

    return (
      <div>
        <h1>Records</h1>
        <RecordForm onAddRecord={this.handleAddRecord.bind(this)} />
        {recordsComponent}
      </div>
    );
  }
}

export default Records;
