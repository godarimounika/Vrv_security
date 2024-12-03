

let users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", active: true, role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", active: false, role: "Editor" },
    { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", active: true, role: "Viewer" },
    { id: 4, name: "Bob Williams", email: "bob.williams@example.com", active: true, role: "Contributor" },
    { id: 5, name: "Charlie Brown", email: "charlie.brown@example.com", active: false, role: "Manager" },
    { id: 6, name: "Diana Prince", email: "diana.prince@example.com", active: true, role: "Support" },
    { id: 7, name: "Ethan Hunt", email: "ethan.hunt@example.com", active: true, role: "Moderator" },
    { id: 8, name: "Fiona Gallagher", email: "fiona.gallagher@example.com", active: false, role: "Analyst" },
    { id: 9, name: "George Washington", email: "george.washington@example.com", active: true, role: "Developer" },
    { id: 10, name: "Hannah Montana", email: "hannah.montana@example.com", active: true, role: "Tester" },
];

let roles = [
    { id: 1, roleName: "Admin", description: "Administrator with full permissions", permissions: ["create", "read", "update", "delete"] },
    { id: 2, roleName: "Editor", description: "Can edit content but has limited permissions", permissions: ["read", "update"] },
    { id: 3, roleName: "Viewer", description: "Can only view content", permissions: ["read"] },
    { id: 4, roleName: "Contributor", description: "Can add content but not edit or delete", permissions: ["create", "read"] },
    { id: 5, roleName: "Manager", description: "Manages team operations with extended permissions", permissions: ["create", "read", "update"] },
    { id: 6, roleName: "Support", description: "Handles customer queries and support tickets", permissions: ["read", "update", "delete"] },
    { id: 7, roleName: "Moderator", description: "Monitors user-generated content", permissions: ["read", "delete"] },
    { id: 8, roleName: "Analyst", description: "Analyzes data with read-only access", permissions: ["read"] },
    { id: 9, roleName: "Developer", description: "Develops and updates application features", permissions: ["create", "read", "update"] },
    { id: 10, roleName: "Tester", description: "Tests and reports issues in applications", permissions: ["read", "create"] }
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Export mockApi
export const userApi = {
    getUsers: async () => {
        await delay(500);
        return users;
    },
    updateUser: async (updatedUser) => {
        await delay(500);
        users = users.map((user) => (user.id === updatedUser.id ? updatedUser : user));
        return updatedUser;
      },
    deleteUser: async (id) => {
        await delay(500);
        users = users.filter((user) => user.id !== id);
        return id;
    },
    createUser: async (newUser) => {
        await delay(500);
        const newId = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
        const userWithId = { ...newUser, id: newId };
        users.push(userWithId);
        return userWithId;
    }
};

// Mock API for roles
export const roleApi = {
    getRoles: async () => {
        await delay(500);
        return roles;
    },
    updateRole: async (updatedRole) => {
        await delay(500);
        roles = roles.map((role) => (role.id === updatedRole.id ? updatedRole : role));
        return updatedRole;
    },
    deleteRole: async (id) => {
        await delay(500);
        roles = roles.filter((role) => role.id !== id);
        return id;
    },
    createRole: async (newRole) => {
        await delay(500);
        const newId = roles.length ? Math.max(...roles.map(role => role.id)) + 1 : 1;
        const roleWithId = { ...newRole, id: newId };
        roles.push(roleWithId);
        return roleWithId;
    }
};
