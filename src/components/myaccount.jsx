import React, {useState, useEffect} from "react";
import { fetchFromAPI } from "../api";

const MyAccount = ({user}) => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
    
  const handlePurchaseHistory = async () => {
    const data = await fetchFromAPI({
      path: `/history/${user.username}`
    });

    if (data) {
      setPurchaseHistory(data);
    }
  }


console.log("purchaseHistory: ", purchaseHistory);

  useEffect(() => {
    handlePurchaseHistory();
  }, []);

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