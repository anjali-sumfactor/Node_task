import React, { useState, useEffect } from 'react';

interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;

}
export default function GetAllUserData() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        handleGetAllUsers();
    }, []);

    const handleGetAllUsers = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/getAllUsers', {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                setUsers(data.message);
                console.log(data.message);
            } else {
                console.log('Error retrieving users data');
            }
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };


    const handleDeleteUserData = async (email: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
                setUsers(users.filter((user) => user.email !== email));
            } else {
                console.log('Error deleting user data');
            }
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    return (
        <div>
            <h1>All Users Data</h1>
            <button onClick={handleGetAllUsers} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Get All Users'}
            </button>
            {users && users.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((data, index) => (
                            <tr key={index}>
                                <td>{data.first_name}</td>
                                <td>{data.last_name}</td>
                                <td>{data.email}</td>
                                <td>
                                    <button onClick={() => handleDeleteUserData(data.email)} disabled={isLoading}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
};