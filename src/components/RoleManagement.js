import React, { useState, useEffect } from "react";
import { roleApi } from "../API/MockAPi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentRole, setCurrentRole] = useState({
    roleName: "",
    description: "",
    permissions: [],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  const permissionOptions = ["create", "read", "update", "delete"];

  // Fetch roles on component mount
  useEffect(() => {
    roleApi.getRoles().then(setRoles);
  }, []);

  const handleOpenModal = (role = null) => {
    if (role) {
      setIsEditMode(true);
      const validPermissions = role.permissions.filter(perm => 
        permissionOptions.includes(perm)
      );
      setCurrentRole({
        ...role,
        permissions: validPermissions
      });
    } else {
      setIsEditMode(false);
      setCurrentRole({ roleName: "", description: "", permissions: [] });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentRole({ roleName: "", description: "", permissions: [] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentRole((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (permission) => {
    setCurrentRole((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const handleSaveRole = () => {
    if (isEditMode) {
      roleApi.updateRole(currentRole).then((updatedRole) => {
        setRoles((prev) =>
          prev.map((role) => (role.id === updatedRole.id ? updatedRole : role))
        );
      });
    } else {
      roleApi.createRole(currentRole).then((newRole) => {
        setRoles((prev) => [...prev, newRole]);
      });
    }
    handleCloseModal();
  };

  const handleDeleteRole = (id) => {
    roleApi.deleteRole(id).then(() => {
      setRoles((prev) => prev.filter((role) => role.id !== id));
    });
  };

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "ascending"
        ? "descending"
        : "ascending";

    setSortConfig({ key, direction });
    const sortedRoles = [...roles].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setRoles(sortedRoles);
  };

  const filteredRoles = roles.filter((role) =>
    role.roleName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-fluid p-3 animate__animated animate__fadeIn">
      <div className="row mb-3">
        <div className="col-md-6 col-12">
          <h2 className="text-center text-md-start fs-4">Role Management</h2>
        </div>
        <div className="col-md-3 col-12 text-end">
          <input
            type="text"
            placeholder="Search by Role Name"
            className="form-control form-control-sm mb-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-md-3 col-12 text-end">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleOpenModal()}
          >
            Create Role +
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover table-sm">
          <thead className="table-primary">
            <tr>
              <th className="d-none d-md-table-cell">#</th>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => handleSort("roleName")}
              >
                Role Name{" "}
                {sortConfig.key === "roleName" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => handleSort("permissions")}
              >
                Permissions{" "}
                {sortConfig.key === "permissions" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoles.map((role, index) => (
              <tr key={role.id}>
                <td className="d-none d-md-table-cell">{index + 1}</td>
                <td>{role.roleName}</td>
                <td>{role.permissions.join(", ")}</td>
                <td>
                  <div className=" justify-content-start align-items-center">
                    <span
                      className="text-primary mx-1"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleOpenModal(role)}
                    >
                      <EditIcon 
                        fontSize="small" 
                        className="sm-icon" 
                        style={{ fontSize: '1rem' }} 
                      />
                    </span>
                    <span
                      className="text-danger mx-1"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteRole(role.id)}
                    >
                      <DeleteIcon 
                        fontSize="small" 
                        className="sm-icon" 
                        style={{ fontSize: '1rem' }} 
                      />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "1rem",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
            zIndex: 1000,
            width: "500px",
            maxWidth: "90%",
          }}
        >
          <h3 className="fs-5">{isEditMode ? "Edit Role" : "Create Role"}</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveRole();
            }}
          >
            <div className="mb-3">
              <label className="form-label small">Role Name:</label>
              <input
                type="text"
                name="roleName"
                className="form-control form-control-sm"
                value={currentRole.roleName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label small">Permissions:</label>
              <div>
                {permissionOptions.map((permission) => (
                  <div key={permission} className="form-check form-check-sm">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={permission}
                      checked={currentRole.permissions.includes(permission)}
                      onChange={() => handlePermissionChange(permission)}
                    />
                    <label 
                      className="form-check-label small" 
                      htmlFor={permission}
                    >
                      {permission}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <button 
                type="submit" 
                className="btn btn-primary btn-sm me-2"
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;