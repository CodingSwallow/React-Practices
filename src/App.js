import React, { Component } from 'react';
import Records from './components/Records';
import './css/main.css';

class App extends Component {
  render() {
    return (
      <div className='records-container'>
        <Records />
      </div>
    );
  }
}

export default App;
