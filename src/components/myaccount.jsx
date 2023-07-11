import React, {useState, useEffect} from "react";
import { useReducer } from "react";
import { fetchFromAPI } from "../api";

const MyAccount = ({user}) => {
    const [myInfo, setMyInfo] = useState([])
    const [myOrders, setMyOrders] = useState([])
    

    const getMyOrders = async(event) => {

        const data = await fetchFromAPI({
            path: `/orders/${user.username}`
        })

        console.log(data)

    }

    useEffect(() => {
        if(user){
            return;
        }
        try {
          Promise.all([fetchFromAPI({ path: `/users/me` })]).then(([data]) => {
            setMyInfo(data);
            console.log(data);
          });
          console.log("products: ", products);
        } catch (error) {
          console.log(error);
        }
      }, []);

      useEffect( ()=>{
           async function fetchData(){
            await getMyOrders()
           }

           fetchData();
      }, [] )

return (
    <div id='my-account-main-div'>
        <h3 id='my-account-header'>Hello, {user.username}</h3>
        <div id='my-orders'>
        <h3 id='purchase-history'>Purchase history</h3>
        </div>
    </div>
)
}

export default  MyAccount;