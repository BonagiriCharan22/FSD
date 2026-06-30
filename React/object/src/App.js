import "./App.css";
import { useState, useEffect } from "react";

let istudents = [
  { name: "charan", age: 20, grade: "A", status: "Active" },
  { name: "sai", age: 21, grade: "B", status: "Pending" },
  { name: "kiran", age: 22, grade: "C", status: "Active" },
];

function App() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    grade: "",
    status: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : istudents;
  });

  const [search, setSearch] = useState("");
  const [ascending, setAscending] = useState(true);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addStudent = () => {
    if (
      formData.name.trim() === "" ||
      formData.age.trim() === "" ||
      formData.grade.trim() === "" ||
      formData.status.trim() === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (isNaN(formData.age) || Number(formData.age) <= 0) {
      alert("Please enter a valid age.");
      return;
    }

    setStudents([...students, formData]);

    setFormData({
      name: "",
      age: "",
      grade: "",
      status: "",
    });
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((_, i) => i !== index));
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(students[index]);
  };

  const handleUpdate = () => {
    if (
      formData.name.trim() === "" ||
      formData.age.trim() === "" ||
      formData.grade.trim() === "" ||
      formData.status.trim() === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    const updatedStudents = students.map((student, index) =>
      index === editIndex ? formData : student
    );

    setStudents(updatedStudents);

    setFormData({
      name: "",
      age: "",
      grade: "",
      status: "",
    });

    setEditIndex(null);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedStudents = [...filteredStudents].sort((a, b) =>
    ascending
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  const total = students.length;
  const active = students.filter((s) => s.status === "Active").length;
  const pending = students.filter((s) => s.status === "Pending").length;

  return (
    <div className="container mt-4">

      <h1 className="text-center mb-4">Student Management System</h1>

      {/* Dashboard Cards */}

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h5>Total Students</h5>
              <h2>{total}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h5>Active Students</h5>
              <h2>{active}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-warning text-dark">
            <div className="card-body text-center">
              <h5>Pending Students</h5>
              <h2>{pending}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}

      <input
        className="form-control mb-3"
        placeholder="Search Student"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h2>{editIndex !== null ? "Update Student" : "Add Student"}</h2>

      <input
        className="form-control mb-2"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        className="form-control mb-2"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
      />

      <input
        className="form-control mb-2"
        name="grade"
        placeholder="Grade"
        value={formData.grade}
        onChange={handleChange}
      />

      <select
        className="form-control mb-3"
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
      </select>

      {editIndex !== null ? (
        <button className="btn btn-primary mb-3" onClick={handleUpdate}>
          Update Student
        </button>
      ) : (
        <button className="btn btn-success mb-3" onClick={addStudent}>
          Add Student
        </button>
      )}

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => setAscending(!ascending)}
            >
              Name {ascending ? "▲" : "▼"}
            </th>
            <th>Age</th>
            <th>Grade</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {sortedStudents.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.grade}</td>
              <td>
                <span
                  className={`badge ${
                    student.status === "Active"
                      ? "bg-success"
                      : "bg-warning text-dark"
                  }`}
                >
                  {student.status}
                </span>
              </td>

              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
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