import './App.css';
import { useState } from 'react';
let istudents=[{'name':'charan','age':20,'grade':'A'},{'name':'sai','age':21,'grade':'B'},{'name':'kiran','age':22,'grade':'C'},{'name':'suresh','age':23,'grade':'D'},{'name':'ramesh','age':24,'grade':'E'},{'name':'rajesh','age':25,'grade':'F'}];

function App() {
  let [formData,setFormData]=useState({name:'',age:'',grade:''})
  let [editIndex,setEditIndex]=useState(null);
  let [students,setStudents]=useState(istudents);
  let [search,setSearch]=useState("");
  let [ascending,setAscending]=useState(true);
   const handleChage=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const addStudent=(obj)=>{
    setStudents([...students,formData])
    setFormData({name:'',age:'',grade:''})
  }

  
  const handleDelete=(index)=>{
    const updatedStudents=students.filter((s,i)=>i !== index)
    setStudents(updatedStudents)
  }
  const handelEdit=(i)=>{
    setEditIndex(i)
    setFormData(students[i])
  }
  const handleUpdate=()=>{
    const updatedStudents=students.map((s,i)=>i===editIndex?formData:s)
    setStudents(updatedStudents)
    setFormData({name:'',age:'',grade:''})
    setEditIndex(null)
  }

  const filteredStudent = students.filter((s)=> s.name.toLowerCase().includes(search.toLowerCase()));
  const sorted = [...filteredStudent].sort((a,b)=> ascending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
  
  
  return (
    <div className="App">
      <input className="form-control" value={search} placeholder='Type to Search' onChange={(e)=>setSearch(e.target.value)}></input>
      {editIndex!==null?<h1> Update Student</h1>:<h1>ADD STUDENT</h1>}
      <div className='form'>
        <input className='form-control m-2' name='name'  value={formData.name} onChange={handleChage}></input>
        <input className='form-control m-2' name="age"  value={formData.age} onChange={handleChage}></input>
        <input className='form-control m-2' name="grade" value={formData.grade} onChange={handleChage}></input>
        
        {editIndex!==null?<button className='btn btn-primary m-2' name='submit' type='submit' onClick={()=>handleUpdate()}>Update</button>:
        <button className='btn btn-primary m-2' name='submit' type='submit' onClick={()=>addStudent()}> Add Student</button>}
      </div>

      <h1>List of Students</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th style={{cursor:'pointer'}} onClick={()=>setAscending(!ascending)}>Name<i className={ascending?'bi bi-arrow-up':'bi bi-arrow-down'}></i></th>
            <th>Age</th>
            <th>Grade</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.grade}</td>
              <td>
                <button className='btn btn-primary m-2' onClick={()=>handelEdit(index)}>Edit</button>
                <button className='btn btn-danger m-2' onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
