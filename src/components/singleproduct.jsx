import React, {useState, useEffect} from "react"
import { fetchFromAPI } from "../api";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
    const {id} = useParams(); 
    console.log(id);

    const [product, setProduct] = useState(null)

    const getProduct = async() => {
        
        const data = await fetchFromAPI({
            path:`/products/${id}`
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
        {product 
          &&  <>
        <h2 id='single-product-name'>{product.name}</h2>
        <div id='product-info-with-image'>
            <img src={product.image && product.image} id='single-product-image' />
            <div id='product-info'>
                <div>
                    <h5 id='product-price'>${product.price}</h5>
                    <p id='single-when-purchased-online'>When purchased online</p>
                    <div id='single-product-pickup-options-div'>
                        <div id='single-product-pickup'>
                            <p id='single-product-pickup-text'>Pickup</p>
                            <p id='ready-within-2-hours'>Ready within 2 hours</p>
                        </div>
                        <div id='single-product-pickup'>
                            <p id='single-product-pickup-text'>Delivery</p>
                            <p id='ready-within-2-hours'>Select delivery window at checkout</p>
                        </div>
                        <div id='single-product-pickup'>
                            <p id='single-product-pickup-text'>Shipping</p>
                            <p id='ready-within-2-hours'>Get it within 3 business days</p>
                        </div>
                    </div>
                   
                    <button id='single-product-add-to-cart'>Add to cart</button>
                </div>
            </div>
        </div>
        </>
}
    </div>
)
}

export default SingleProduct;