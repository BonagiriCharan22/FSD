import './App.css';
let students=[{'name':'charan','age':20},{'name':'sai','age':21},{'name':'kiran','age':22},{'name':'suresh','age':23},{'name':'ramesh','age':24},{'name':'rajesh','age':25}];

function App() {
  return (
    <div className="App">
      <h1>List of Students</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
