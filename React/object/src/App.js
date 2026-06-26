import "./App.css";
import { useState } from "react";
let istudents = [
  { name: "charan", age: 20, grade: "A" },
  { name: "sai", age: 21, grade: "B" },
  { name: "kiran", age: 22, grade: "C" },
  { name: "suresh", age: 23, grade: "D" },
  { name: "ramesh", age: 24, grade: "E" },
  { name: "rajesh", age: 25, grade: "F" },
];

function App() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    grade: "",
  });

  const [editIndex, setEditIndex] = useState(null);
  const [students, setStudents] = useState(istudents);
  const [search, setSearch] = useState("");
  const [ascending, setAscending] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const addStudent = () => {
    if (
      formData.name.trim() === "" ||
      formData.age.trim() === "" ||
      formData.grade.trim() === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (isNaN(formData.age) || Number(formData.age) <= 0) {
      alert("Please enter a valid age.");
      return;
    }

    setStudents([...students, formData]);
    setFormData({ name: "", age: "", grade: "" });
  };

  // Delete with Confirmation
  const handleDelete = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (confirmDelete) {
      const updatedStudents = students.filter((_, i) => i !== index);
      setStudents(updatedStudents);
    }
  };

  const handleEdit = (i) => {
    setEditIndex(i);
    setFormData(students[i]);
  };

  const handleUpdate = () => {
    if (
      formData.name.trim() === "" ||
      formData.age.trim() === "" ||
      formData.grade.trim() === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    const updatedStudents = students.map((s, i) =>
      i === editIndex ? formData : s
    );

    setStudents(updatedStudents);
    setFormData({ name: "", age: "", grade: "" });
    setEditIndex(null);
  };
  const filteredStudent = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filteredStudent].sort((a, b) =>
    ascending
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );
  return (
    <div className="App container mt-4">
      <input
        className="form-control mb-3"
        value={search}
        placeholder="Type to Search"
        onChange={(e) => setSearch(e.target.value)}
      />
      {editIndex !== null ? <h2>Update Student</h2> : <h2>Add Student</h2>}
      <div className="form">
        <input
          className="form-control m-2"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          className="form-control m-2"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />

        <input
          className="form-control m-2"
          name="grade"
          placeholder="Grade"
          value={formData.grade}
          onChange={handleChange}
        />

        {editIndex !== null ? (
          <button
            className="btn btn-primary m-2"
            onClick={handleUpdate}
          >
            Update
          </button>
        ) : (
          <button
            className="btn btn-success m-2"
            onClick={addStudent}
          >
            Add Student
          </button>
        )}
      </div>

      <h2 className="mt-4">List of Students</h2>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => setAscending(!ascending)}
            >
              Name{" "}
              <i
                className={
                  ascending ? "bi bi-arrow-up" : "bi bi-arrow-down"
                }
              ></i>
            </th>
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
                <button
                  className="btn btn-primary m-2"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger m-2"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;