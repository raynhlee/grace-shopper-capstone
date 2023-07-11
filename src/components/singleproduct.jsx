import React, {useState, useEffect} from "react"
import { fetchFromAPI } from "../api";

const SingleProduct = ({singleProductId}) => {
    console.log(singleProductId);

    const [product, setProduct] = useState([])

    const getProduct = async() => {
        
        const data = await fetchFromAPI({
            path:`/products/${singleProductId}`
        });

        setProduct(data);


    }

    useEffect(() => {
        const loadProduct = async () => {
            await getProduct();
        }
        loadProduct();
    }, []);
    

return(
    <div id='single-product-main-div'>
        <h2 id='single-product-name'>{product.name}</h2>
        <div id='product-info-with-image'>
            <img src={product.image && product.image} id='single-product-image' />
            <div id='product-info'>
                <div>
                    <h5 id='product-price'>${product.price}</h5>
                    <p id='single-when-purchased-online'>When purchased online</p>
                </div>
            </div>
        </div>
        
    </div>
)
}

export default SingleProduct;