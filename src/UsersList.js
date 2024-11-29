import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ fullName: "", role: "" });
    const [editingUser, setEditingUser] = useState(null); // Track the user being edited

    // Fetch users from Firestore
    useEffect(() => {
        const fetchUsers = async () => {
            const querySnapshot = await getDocs(collection(db, "Users"));
            const usersData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsers(usersData);
        };

        fetchUsers();
    }, []);

    // Add a new user to Firestore
    const addUser = async (e) => {
        e.preventDefault();
        if (newUser.fullName && newUser.role) {
            try {
                await addDoc(collection(db, "Users"), newUser);
                setUsers((prev) => [...prev, { ...newUser }]);
                setNewUser({ fullName: "", role: "" }); // Clear the form
                alert("User added successfully!");
            } catch (error) {
                console.error("Error adding user:", error);
            }
        } else {
            alert("Please fill in all fields!");
        }
    };

    // Delete a user from Firestore
    const deleteUser = async (id) => {
        try {
            await deleteDoc(doc(db, "Users", id));
            setUsers((prev) => prev.filter((user) => user.id !== id));
            alert("User deleted successfully!");
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    // Update a user in Firestore
    const updateUser = async (e) => {
        e.preventDefault();
        if (editingUser && editingUser.fullName && editingUser.role) {
            try {
                await updateDoc(doc(db, "Users", editingUser.id), {
                    fullName: editingUser.fullName,
                    role: editingUser.role,
                });
                setUsers((prev) =>
                    prev.map((user) =>
                        user.id === editingUser.id ? { ...user, ...editingUser } : user
                    )
                );
                setEditingUser(null); // Exit edit mode
                alert("User updated successfully!");
            } catch (error) {
                console.error("Error updating user:", error);
            }
        } else {
            alert("Please fill in all fields!");
        }
    };

    return (
        <div>
            <h2>Users List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.fullName} - {user.role}
                        <button onClick={() => setEditingUser(user)}>Edit</button>
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {editingUser ? (
                <div>
                    <h3>Edit User</h3>
                    <form onSubmit={updateUser}>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={editingUser.fullName}
                            onChange={(e) =>
                                setEditingUser({ ...editingUser, fullName: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Role"
                            value={editingUser.role}
                            onChange={(e) =>
                                setEditingUser({ ...editingUser, role: e.target.value })
                            }
                        />
                        <button type="submit">Save</button>
                        <button onClick={() => setEditingUser(null)}>Cancel</button>
                    </form>
                </div>
            ) : (
                <div>
                    <h3>Add New User</h3>
                    <form onSubmit={addUser}>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={newUser.fullName}
                            onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Role"
                            value={newUser.role}
                            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        />
                        <button type="submit">Add User</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UsersList;
