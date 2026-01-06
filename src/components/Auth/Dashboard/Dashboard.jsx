import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import { initialEmployees } from "../../../utils/InitialEmployees";
import EmployeeList from "../../Employees/EmployeeList";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [genderFilter, setGenderFilter] = useState("all");

  const closeDeleteModal = () => {
    setEmployeeToDelete(null);
    setShowDeleteModal(false);
  };

  const openDeleteModal = (employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updatedEmployees = employees.filter(
      (emp) => emp.id !== employeeToDelete.id
    );

    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));

    closeDeleteModal();
  };

  const filteredEmployees = employees.filter((emp) => {
    // Name filter
    const matchesName = emp.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Gender filter
    const matchesGender = genderFilter === "all" || emp.gender === genderFilter;

    // Status filter
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && emp.isActive) ||
      (statusFilter === "inactive" && !emp.isActive);

    return matchesName && matchesGender && matchesStatus;
  });

  const [newEmployee, setNewEmployee] = useState({
    id: "",
    name: "",
    gender: "",
    dob: "",
    state: "",
    isActive: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem("employees");
    if (!stored) {
      localStorage.setItem("employees", JSON.stringify(initialEmployees));
      setEmployees(initialEmployees);
    } else {
      setEmployees(JSON.parse(stored));
    }
  }, []);

  /* ---------- COUNTS ---------- */
  const total = employees.length;
  const active = employees.filter((e) => e.isActive).length;
  const inactive = total - active;

  /* ---------- MODAL ---------- */

  const openAddModal = () => {
    setEditIndex(null);
    setNewEmployee({
      id: "",
      name: "",
      gender: "",
      dob: "",
      state: "",
      isActive: true,
      image: "",
    });
    setErrors({});
    setSubmitted(false);
    setIsModalOpen(true);
  };

  const openEditModal = (employee) => {
    setEditIndex(employee.id);
    setNewEmployee({ ...employee });
    setErrors({});
    setSubmitted(false);
    setIsModalOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setNewEmployee((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditIndex(null);
  };

  /* ---------- INPUT ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const err = {};

    if (!newEmployee.id.trim()) {
      err.id = "Employee ID required";
    } else {
      const isDuplicate = employees.some(
        (emp) => emp.id === newEmployee.id && emp.id !== editIndex
      );

      if (isDuplicate) {
        err.id = "Employee ID must be unique";
      }
    }

    if (!newEmployee.name.trim()) err.name = "Name required";
    else if (newEmployee.name.length < 3) err.name = "Min 3 characters";

    if (!newEmployee.gender) err.gender = "Gender required";
    if (!newEmployee.dob) err.dob = "DOB required";
    if (!newEmployee.state) err.state = "State required";

    if (!newEmployee.image) {
      err.image = "Profile image is required";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!validateForm()) return;

    const updatedEmployees =
      editIndex !== null
        ? employees.map((emp) => (emp.id === editIndex ? newEmployee : emp))
        : [...employees, newEmployee];

    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    closeModal();
  };

  const toggleStatus = (id) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...emp, isActive: !emp.isActive } : emp
      )
    );
  };

  return (
    <div>
      <Header />

      <div className="dashboard-body">
        <Sidebar openAddModal={openAddModal} />

        <div className="content">
          <h2>Welcome 👋</h2>

          <div className="cards">
            <div className="card">Total: {total}</div>
            <div className="card">Active: {active}</div>
            <div className="card">Inactive: {inactive}</div>
          </div>

          <h2>Employee List</h2>

          <div className="table-toolbar">
            <div className="table-toolbar-left">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
              >
                <option value="all">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <button className="print-btn" onClick={() => window.print()}>
              Print
            </button>
          </div>

          <EmployeeList
            employees={filteredEmployees}
            onEdit={openEditModal}
            onToggleStatus={toggleStatus}
            onDelete={openDeleteModal}
          />

          {isModalOpen && (
            <div className="modal-backdrop">
              <div className="modal">
                <h2>{editIndex !== null ? "Edit Employee" : "Add Employee"}</h2>

                <form onSubmit={handleSubmit}>
                  <div>
                    <label>ID</label>
                    <input
                      name="id"
                      value={newEmployee.id}
                      disabled={editIndex !== null}
                      onChange={handleChange}
                    />
                    {submitted && errors.id && (
                      <span className="error">{errors.id}</span>
                    )}
                  </div>

                  <div>
                    <label>Name</label>
                    <input
                      name="name"
                      value={newEmployee.name}
                      onChange={handleChange}
                    />
                    {submitted && errors.name && (
                      <span className="error">{errors.name}</span>
                    )}
                  </div>

                  <div>
                    <label>Gender</label>
                    <select
                      name="gender"
                      value={newEmployee.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                    {submitted && errors.gender && (
                      <span className="error">{errors.gender}</span>
                    )}
                  </div>

                  <div>
                    <label>DOB</label>
                    <input
                      type="date"
                      name="dob"
                      value={newEmployee.dob}
                      onChange={handleChange}
                    />
                    {submitted && errors.dob && (
                      <span className="error">{errors.dob}</span>
                    )}
                  </div>

                  <div>
                    <label>State</label>
                    <select
                      name="state"
                      value={newEmployee.state}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option>Tamil Nadu</option>
                      <option>Karnataka</option>
                      <option>Kerala</option>
                    </select>
                    {submitted && errors.state && (
                      <span className="error">{errors.state}</span>
                    )}
                  </div>
                  <div>
                    <label>Profile Image</label>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />

                    {submitted && errors.image && (
                      <span className="error">{errors.image}</span>
                    )}

                    {newEmployee.image && (
                      <img
                        src={newEmployee.image}
                        alt="Preview"
                        className="image-preview"
                      />
                    )}
                  </div>

                  <div className="status-group">
                    <label
                      className={`status-option ${
                        newEmployee.isActive ? "active" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="status"
                        checked={newEmployee.isActive === true}
                        onChange={() =>
                          setNewEmployee((p) => ({ ...p, isActive: true }))
                        }
                      />
                      Active
                    </label>

                    <label
                      className={`status-option ${
                        !newEmployee.isActive ? "inactive" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="status"
                        checked={newEmployee.isActive === false}
                        onChange={() =>
                          setNewEmployee((p) => ({ ...p, isActive: false }))
                        }
                      />
                      Inactive
                    </label>
                  </div>

                  <div className="modal-buttons">
                    <button type="submit">
                      {editIndex !== null ? "Update" : "Add"}
                    </button>
                    <button type="button" onClick={closeModal}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {showDeleteModal && (
            <div className="modal-backdrop">
              <div className="modal small">
                <h3>Delete Employee</h3>

                <p>
                  Are you sure you want to delete{" "}
                  <strong>{employeeToDelete?.name}</strong>?
                </p>

                <div className="modal-buttons">
                  <button className="danger" onClick={confirmDelete}>
                    Yes, Delete
                  </button>
                  <button onClick={closeDeleteModal}>Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
