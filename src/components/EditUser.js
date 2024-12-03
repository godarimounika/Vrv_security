import React, { useEffect, useState } from "react";

function EditUser({ userData, editMode, handleSubmit, handleClose, roles, loading }) {
  const [formData, setFormData] = useState(userData);

  useEffect(() => {
    setFormData(userData);
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStatusChange = (status) => {
    setFormData((prevData) => ({
      ...prevData,
      active: status,
    }));
  };

  const handleRoleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      role: e.target.value,
    }));
  };

  return (
    <div className="modal fade show" tabIndex="-1" style={{ display: "block", background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{editMode ? "Edit User" : "Create User"}</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="userName" className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter user name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="userEmail" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="userEmail"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="status"
                      id="active"
                      value="active"
                      checked={formData.active}
                      onChange={() => handleStatusChange(true)}
                    />
                    <label className="form-check-label" htmlFor="active">Active</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="status"
                      id="inactive"
                      value="inactive"
                      checked={!formData.active}
                      onChange={() => handleStatusChange(false)}
                    />
                    <label className="form-check-label" htmlFor="inactive">Inactive</label>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="userRole" className="form-label">Role</label>
                <select
                  className="form-select scrollable-dropdown"
                  id="userRole"
                  name="role"
                  value={formData.role}
                  onChange={handleRoleChange}
                >
                  <option value="">Select a role</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>{role.roleName}</option>
                  ))}
                </select>
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleSubmit(formData)}
              disabled={loading}
            >
              {loading ? "Saving..." : editMode ? "Save Changes" : "Create User"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
