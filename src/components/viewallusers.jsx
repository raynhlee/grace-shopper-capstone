import React, {useState, useEffect} from 'react'
import { fetchFromAPI } from '../api';

const ViewAllUsers = () => {
    const [users, setUsers] = useState([])

    const getAllUsers = async() => {
        const data = await fetchFromAPI({
            path: '/users'
        })

        if(data){
            console.log(data)
            setUsers(data)
        }
    }

    useEffect(()=> {
        getAllUsers();
    }, [])

    return(
        <div id='all-users-map'>
            <h3>All users</h3>
        {
            users && users.map((user) => {
                return (
                    <div key={user.id} id='user-info'>
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p> User ID: {user.id}</p>
                        {
                            user.isAdmin
                            ? <p>User status: Admin</p>
                            : <p>User status: User</p>
                        }
                    </div>
                )
            })
        }
        </div>
    )

}
export default ViewAllUsers;