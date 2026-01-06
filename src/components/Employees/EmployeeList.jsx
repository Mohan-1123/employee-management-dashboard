import "./EmployeeList.css";
import { FaEdit, FaTrash } from "react-icons/fa";

function EmployeeList({ employees, onEdit, onToggleStatus, onDelete }) {
  return (
    <div className="print-area">
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Profile</th>
            <th>Name</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>State</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No employees found
              </td>
            </tr>
          ) : (
            employees.map((emp, index) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>

                <td>
                  {emp.image ? (
                    <img
                      src={emp.image}
                      alt="profile"
                      className="profile-img"
                    />
                  ) : (
                    "N/A"
                  )}
                </td>

                <td className="name-cell" title={emp.name}>
                  {emp.name}
                </td>
                <td>{emp.gender}</td>
                <td>{emp.dob}</td>
                <td>{emp.state}</td>

                <td>
                  <input
                    type="checkbox"
                    checked={emp.isActive}
                    onChange={() => onToggleStatus(emp.id)}
                  />
                  {emp.isActive ? " Active" : " Inactive"}
                </td>

                <td className="actions-cell">
                  <div className="actions-wrapper">
                    <button className="icon-btn" data-label="Edit">
                      <FaEdit onClick={() => onEdit(emp)} />
                      <span className="action-text">Edit</span>
                    </button>

                    <button
                      className="icon-btn"
                      data-label="Delete"
                      onClick={() => onDelete(emp)}
                    >
                      <FaTrash />
                      <span className="action-text">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
