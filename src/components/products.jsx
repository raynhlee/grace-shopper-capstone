import React, {useEffect} from "react";
import { fetchFromAPI } from "../api";

const AllProducts = (props) => {
    const {productType} = props;
    const getAllProducts = async() => {
        let data = fetchFromAPI()
    }

    return(
        <div>
            <p>Hello</p>
        </div>
    )
}
export default AllProducts;