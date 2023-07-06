import React, {useEffect} from "react";
import { fetchFromAPI } from "../api";

const AllGuitars = (props) => {
    
    const getAllGuitars = async() => {
        let data = fetchFromAPI()
    }

    return(
        <div>
            <p>Hello</p>
        </div>
    )
}
export default AllGuitars;