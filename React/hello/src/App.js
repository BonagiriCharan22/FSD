import './App.css';
let name="charan";
function App() {
  return (
    <div className="App">
      hello world
      <App1 name={name}/>
    </div>
  );
}
function App1(props) {
  return (
    <div className="App">
      hello {props.name}
    </div>
  );
}

export default App;
