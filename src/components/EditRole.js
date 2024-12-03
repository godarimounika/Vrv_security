import React, { useEffect, useState } from "react";

function EditRole({ roleData, editMode, handleSubmit, handleClose, loading }) {
  const [formData, setFormData] = useState(roleData);

  useEffect(() => {
    setFormData(roleData);
  }, [roleData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePermissionsChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      permissions: e.target.value.split(",").map((p) => p.trim()),
    }));
  };

  return (
    <div className="modal fade show" tabIndex="-1" style={{ display: "block", background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{editMode ? "Edit Role" : "Create Role"}</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="roleName" className="form-label">Role Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="roleName"
                  name="roleName"
                  value={formData.roleName}
                  onChange={handleChange}
                  placeholder="Enter role name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="permissions" className="form-label">Permissions</label>
                <input
                  type="text"
                  className="form-control"
                  id="permissions"
                  name="permissions"
                  value={formData.permissions.join(", ")}
                  onChange={handlePermissionsChange}
                  placeholder="e.g., read, write"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="actions" className="form-label">Actions</label>
                <input
                  type="text"
                  className="form-control"
                  id="actions"
                  name="actions"
                  value={formData.actions}
                  onChange={handleChange}
                  placeholder="Enter actions"
                />
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
              {loading ? "Saving..." : editMode ? "Save Changes" : "Create Role"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditRole;
