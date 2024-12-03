import React, { useState, useEffect, useCallback } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { userApi, roleApi } from "../API/MockAPi";
import EditUser from "./EditUser";
// import 'animate.css';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });

  const [userData, setUserData] = useState({
    id: null,
    name: "",
    email: "",
    active: true,
    role: "",
  });

  useEffect(() => {
    async function fetchData() {
      const [usersData, rolesData] = await Promise.all([
        userApi.getUsers(),
        roleApi.getRoles(),
      ]);
      setUsers(usersData);
      setFilteredUsers(usersData);
      setRoles(rolesData);
    }
    fetchData();
  }, []);

  // Search functionality
  useEffect(() => {
    if (!searchTerm) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  // Sorting functionality
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setFilteredUsers(sortedUsers);
  };

  const handleUserRoles = useCallback(
    async (userData) => {
      if (userData.name.trim() && userData.email.trim() && userData.role) {
        setLoading(true);
        try {
          if (!editMode) {
            const userExists = users.some((user) => user.email === userData.email);
            if (userExists) {
              alert("A user with this email already exists!");
              return;
            }
          }

          const selectedRole = roles.find((role) => role.id === parseInt(userData.role));
          const updatedUserData = {
            ...userData,
            role: selectedRole?.roleName || userData.role,
          };

          if (editMode) {
            const updatedUser = await userApi.updateUser(updatedUserData);
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user.id === updatedUser.id ? updatedUser : user
              )
            );
          } else {
            const newUser = await userApi.createUser(updatedUserData);
            if (!users.some((user) => user.id === newUser.id)) {
              setUsers((prevUsers) => [...prevUsers, newUser]);
            }
          }
          resetModal();
        } catch (error) {
          console.error("Error handling user roles", error);
        } finally {
          setLoading(false);
        }
      }
    },
    [users, roles, editMode]
  );

  const handleEdit = (user) => {
    const selectedRole = roles.find((role) => role.roleName === user.role);
    setUserData({
      ...user,
      role: selectedRole?.id || user.role,
    });
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await userApi.deleteUser(id);
    setUsers(users.filter((user) => user.id !== id));
  };

  const resetModal = () => {
    setUserData({ id: null, name: "", email: "", active: true, role: "" });
    setEditMode(false);
    setShowModal(false);
  };

  return (
    <div className="container-fluid p-3 animate__animated animate__fadeIn">
      <div className="row mb-3">
        <div className="col-md-6 col-12">
          <h2 className="text-center text-md-start fs-4">Managing Users</h2>
        </div>
        <div className="col-md-3 col-12 mb-2 mb-md-0">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-3 col-12 text-end">
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => {
              setShowModal(true);
              setEditMode(false);
            }}
          >
            Create User +
          </button>
        </div>
      </div>
      
      <div className="table-responsive">
        <table 
          className="table table-striped table-hover table-sm" 
          style={{ width: '100%' }}
        >
<thead className="table-primary">
  <tr>
    <th
      onClick={() => handleSort("id")}
      className="d-none d-md-table-cell"
      style={{ cursor: "pointer", fontSize: "0.875rem", padding: "0.5rem" }}
    >
      #
      {sortConfig.key === "id" &&
        (sortConfig.direction === "ascending" ? (
          <ArrowUpward fontSize="small" />
        ) : (
          <ArrowDownward fontSize="small" />
        ))}
    </th>
    <th
      onClick={() => handleSort("name")}
      style={{ cursor: "pointer", fontSize: "0.875rem", padding: "0.5rem" }}
    >
      Name
      {sortConfig.key === "name" &&
        (sortConfig.direction === "ascending" ? (
          <ArrowUpward fontSize="small" />
        ) : (
          <ArrowDownward fontSize="small" />
        ))}
    </th>
    <th
      onClick={() => handleSort("email")}
      className="d-none d-md-table-cell"
      style={{ cursor: "pointer", fontSize: "0.875rem", padding: "0.5rem" }}
    >
      Email
      {sortConfig.key === "email" &&
        (sortConfig.direction === "ascending" ? (
          <ArrowUpward fontSize="small" />
        ) : (
          <ArrowDownward fontSize="small" />
        ))}
    </th>
    <th
      onClick={() => handleSort("active")}
      className="d-none d-md-table-cell"
      style={{ cursor: "pointer", fontSize: "0.875rem", padding: "0.5rem" }}
    >
      Status
      {sortConfig.key === "active" &&
        (sortConfig.direction === "ascending" ? (
          <ArrowUpward fontSize="small" />
        ) : (
          <ArrowDownward fontSize="small" />
        ))}
    </th>
    <th
      onClick={() => handleSort("role")}
      style={{ cursor: "pointer", fontSize: "0.875rem", padding: "0.5rem" }}
    >
      Role
      {sortConfig.key === "role" &&
        (sortConfig.direction === "ascending" ? (
          <ArrowUpward fontSize="small" />
        ) : (
          <ArrowDownward fontSize="small" />
        ))}
    </th>
    <th style={{ fontSize: "0.875rem", padding: "0.5rem" }}>Actions</th>
  </tr>
</thead>
<tbody>
  {filteredUsers.map((user) => (
    <tr key={user.id} style={{ fontSize: "0.825rem" }}>
      <td className="p-2 d-none d-md-table-cell">{user.id}</td>
      <td className="p-2">{user.name}</td>
      <td className="p-2 d-none d-md-table-cell">{user.email}</td>
      <td className="p-2 d-none d-md-table-cell">
        <span
          className={`badge ${user.active ? "bg-success" : "bg-danger"}`}
          style={{ fontSize: "0.7rem" }}
        >
          {user.active ? "Active" : "Inactive"}
        </span>
      </td>
      <td className="p-2">{user.role}</td>
      <td className="p-2">
        <span
          className="text-primary mx-1"
          style={{ cursor: "pointer" }}
          onClick={() => handleEdit(user)}
        >
          <EditIcon fontSize="small" />
        </span>
        <span
          className="text-danger mx-1"
          style={{ cursor: "pointer" }}
          onClick={() => handleDelete(user.id)}
        >
          <DeleteIcon fontSize="small" />
        </span>
      </td>
    </tr>
  ))}
</tbody>


        </table>
      </div>
      
      {showModal && (
        <EditUser
          userData={userData}
          editMode={editMode}
          handleSubmit={handleUserRoles}
          handleClose={resetModal}
          roles={roles}
          loading={loading}
        />
      )}
    </div>
  );
}

export default UserManagement;