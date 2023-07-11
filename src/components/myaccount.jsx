import React, {useState, useEffect} from "react";
import { fetchFromAPI } from "../api";

const MyAccount = ({user}) => {
    const [myInfo, setMyInfo] = useState([])
    console.log(user.username);

    const getMyOrders = async(event) => {
        event.preventDefault();

        const data = await fetchFromAPI({
            path: `/${me.username}/orders`
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

return (
    <div id='my-account-main-div'>
        <h3 id='my-account-header'>Hello,</h3>
    </div>
)
}

export default  MyAccount;