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
                        <p> User ID: {user.id}</p>
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                        {
                            user.isAdmin
                            ? <p>Role: <span id='admin'>Admin</span> </p>
                            : <p>Role: <span id='user'>User</span></p>
                        }
                    </div>
                )
            })
        }
        </div>
    )

}
export default ViewAllUsers;