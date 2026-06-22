import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }
  handleclick=()=>{  
    this.setState({ count: this.state.count + 1 })
  }
  render() {
    return (
      <div className="App">
        <h1>count:{this.state.count}</h1>
        <button onClick={this.handleclick} style={{ backgroundColor: 'blue', color: 'white' }}>click</button>
      </div>
    );
  }
}


export default App;
